import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

import { noteDocRef } from "../lib/Firestore-collection";
import { db } from "../lib/Firebase-config";

import { doc, updateDoc, getDoc } from "firebase/firestore";

export default function EditNote() {
  const navigate = useNavigate();
  const noteID = queryString.parse(window.location.search);

  useEffect(() => {
    getSpecificNote();
  }, []);

  /*** DISPLAY SPECIFIC NOTE DEPENDING ON ID/URL ***/

  const [data, setData] = useState({
    title: "",
    description: "",
    important: false,
  });

  const { title, description, important } = data;

  function getSpecificNote() {
    getDoc(noteDocRef(noteID.id))
      .then((response) => {
        let note = response.data();
        delete note.createdAt;
        setData(note);
      })
      .catch((error) => console.log(error.message));
  }

  const handleImportant = () => {
    setData((f) => ({ ...f, important: !f.important }));
  };

  /*** ERROR MESSAGES ***/

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

  /*** UPDATE NOT IF NOT ERRORS APPEAR ***/

  function editNote(e) {
    e.preventDefault();

    if (title === "") {
      return handleSetErrors("titleError", "Enter a title");
    }

    if (description === "") {
      return handleSetErrors("descriptionError", "Enter a description");
    }

    const docRef = doc(db, "notes", noteID.id);

    updateDoc(docRef, { title, description, important })
      .then((respose) => {
        console.log(respose);
        navigate("/notes", { state: { editSuccess: true } });
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <section id="content-wrapper" className="userProfile">
      <div className="row">
        <div className="col-lg-12">
          <h1 className="h1--title">Edit note</h1>
          <form className="editNote">
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
            <button
              type="submit"
              className="btn btn-primary"
              onClick={editNote}
            >
              Update note
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
