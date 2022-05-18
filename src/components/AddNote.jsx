import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { authentication } from "../lib/Firebase-config";
import { noteCollectionRef } from "../lib/Firestore-collection";

import { addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import moment from "moment";

export default function AddNote() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState("");

  /*** GETS USER DATA ***/

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setProfileData(user);
      }
    });
  });

  /*** CHECKING CHECKBOX ***/

  const handleImportant = () => {
    setData((f) => ({ ...f, important: !f.important }));
  };

  /*** DATA FOR INSERT ***/

  let date = new Date();

  const [data, setData] = useState({
    title: "",
    title: "",
    description: "",
    createdAt:
      // date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear(),
      moment().format("MMMM Do YYYY, h:mm:ss a"),
    important: false,
  });

  const { title, description, createdAt, important } = data;

  /*** CHECKING ERRORS ***/

  const [errors, setErrors] = useState({
    titleError: "",
    descriptionError: "",
  });
  const { titleError, descriptionError } = errors;

  function handleSetErrors(type, message) {
    setErrors((previousState) => ({
      ...previousState,
      [type]: message,
    }));
  }

  const handleChange = (e) => {
    if (e.target.name === "title") {
      handleSetErrors("titleError", "");
    }

    if (e.target.name === "description") {
      handleSetErrors("descriptionError", "");
    }

    setData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  /*** ADDING NOTE OF NO ERRORS APPEAR ***/

  function addNote(e) {
    e.preventDefault();

    if (title === "") {
      return handleSetErrors("titleError", "Enter a title");
    }

    if (description === "") {
      return handleSetErrors("descriptionError", "Enter a description");
    }

    addDoc(noteCollectionRef, {
      userID: profileData.uid,
      title,
      description,
      createdAt,
      important,
    })
      .then((response) => {
        console.log(response);
        navigate("/notes", { state: { addSuccess: true } });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <section id="content-wrapper" className="userProfile">
      <div className="row">
        <div className="col-lg-12">
          <h1 className="h1--title">Add note</h1>
          <form className="addNote">
            <div className="form-group">
              <label>Title</label>
              <input
                name="title"
                type="text"
                className="form-control"
                placeholder="Enter title"
                value={title}
                onChange={handleChange}
              />
            </div>
            {titleError && (
              <div className="alert alert-danger" role="alert">
                <i className="fa-solid fa-circle-exclamation"></i>
                {titleError}
              </div>
            )}
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                placeholder="Enter description"
                value={description}
                onChange={handleChange}
              ></textarea>
            </div>
            {descriptionError && (
              <div className="alert alert-danger" role="alert">
                <i className="fa-solid fa-circle-exclamation"></i>
                {descriptionError}
              </div>
            )}
            <div className="form-check mb-3 mt-3">
              <input
                name="important"
                type="checkbox"
                className="form-check-input"
                checked={important}
                onChange={handleImportant}
              />
              <label className="form-check-label">Important</label>
            </div>
            <button type="submit" className="btn btn-primary" onClick={addNote}>
              Add note
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
