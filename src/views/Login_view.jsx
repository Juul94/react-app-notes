import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { authentication } from "../lib/Firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login_view({ title, setProfileData }) {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = data;

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const { emailError, passwordError } = errors;

  function handleSetErrors(type, message) {
    setErrors((previousState) => ({
      ...previousState,
      [type]: message,
    }));
  }

  const handleAction = (e) => {
    e.preventDefault();

    const checkDomain = /^[a-zA-Z0-9_.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}/;

    if (email === "") {
      handleSetErrors("emailError", "Enter email");
    } else if (!checkDomain.test(email)) {
      handleSetErrors("emailError", "Enter a valid email");
    }

    if (password === "") {
      handleSetErrors("passwordError", "Enter a password");
    } else if (password.length < 6) {
      handleSetErrors(
        "passwordError",
        "Hint: Password is at least 6 characters"
      );
    }

    signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        setProfileData(response.user);
        sessionStorage.setItem(
          "Auth Token",
          response._tokenResponse.refreshToken
        );
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/wrong-password") {
          handleSetErrors("passwordError", "Wrong password");
        }
        if (error.code === "auth/user-not-found") {
          handleSetErrors("emailError", "Email does not exist");
        }
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "password") {
      handleSetErrors("passwordError", "");
    }

    if (e.target.name === "email") {
      handleSetErrors("emailError", "");
      return setData((previousState) => ({
        ...previousState,
        [e.target.name]: e.target.value ? e.target.value : "",
      }));
    }
    setData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form>
      <div className="container--small shadow bg-white rounded">
        <div className="heading--area rounded-top">
          <h1 className="h1--title">{title}</h1>
        </div>

        <div className="container--content">
          <div className="form-outline input-group mb-4 mr-sm-2">
            <input
              placeholder="Email"
              name="email"
              type="email"
              className={`form-control ${emailError && "errorStyle"}`}
              onChange={handleChange}
            />
          </div>

          {emailError && (
            <div className="alert alert-danger" role="alert">
              <i className="fa-solid fa-circle-exclamation"></i>
              {emailError}
            </div>
          )}

          <div className="form-outline mb-4">
            <input
              placeholder="Password"
              password="password"
              type="password"
              name="password"
              className={`form-control ${passwordError && "errorStyle"}`}
              onChange={handleChange}
            />
          </div>

          {passwordError && (
            <div className="alert alert-danger" role="alert">
              <i className="fa-solid fa-circle-exclamation"></i>
              {passwordError}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
            onClick={handleAction}
          >
            Login
          </button>
          <div className="text-center">
            <p>
              Not a member? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
