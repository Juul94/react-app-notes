import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  getDocs,
  orderBy,
  query,
  doc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { noteCollectionRef } from "../lib/Firestore-collection";
import { db, authentication } from "../lib/Firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [important, setImportant] = useState(false);
  const [checkDateData, setCheckDateData] = useState("desc");
  const [delSuccess, setDelSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const prevState = location.state;

  /*** GETS USER DATA ***/

  useEffect(() => {
    getNotes();
  }, [checkDateData, important]);

  /*** DISPLAYING NOTES ***/

  function getNotes() {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        if (important) {
          getDocs(
            query(
              noteCollectionRef,
              orderBy("createdAt", checkDateData),
              where("userID", "==", user.uid),
              where("important", "==", true)
            )
          )
            .then((response) => {
              const noteData = response.docs.map((doc) => ({
                data: doc.data(),
                id: doc.id,
              }));
              setNotes(noteData);
            })
            .catch((error) => console.log(error.message));
        } else {
          getDocs(
            query(
              noteCollectionRef,
              where("userID", "==", user.uid),
              orderBy("createdAt", checkDateData)
            )
          )
            .then((response) => {
              const noteData = response.docs.map((doc) => ({
                data: doc.data(),
                id: doc.id,
              }));
              setNotes(noteData);
            })
            .catch((error) => console.log(error.message));
        }
      }
    });
  }

  /*** DELETING NOTE ***/

  function deleteNote(id) {
    const docRef = doc(db, "notes", id);
    deleteDoc(docRef)
      .then(() => {
        getNotes();
        setDelSuccess(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  /*** EDIT NOTE URL DIRECTION ***/

  function editNoteDir(id) {
    navigate("/editnote?id=" + id);
  }

  return (
    <section id="content-wrapper" className="userProfile">
      <div className="row">
        <div className="col-lg-12">
          <h1 className="h1--title mb-4">Notes</h1>
          {delSuccess && (
            <div className="alert alert-danger" role="alert">
              The note has been deleted!
            </div>
          )}
          {!delSuccess && prevState && prevState.addSuccess && (
            <div className="alert alert-success" role="alert">
              The note has been added!
            </div>
          )}
          {!delSuccess && prevState && prevState.editSuccess && (
            <div className="alert alert-primary" role="alert">
              The note has been changed!
            </div>
          )}
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sorting
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button
                className={
                  checkDateData === "desc"
                    ? "activeDrop dropdown-item"
                    : "dropdown-item"
                }
                onClick={() => {
                  setCheckDateData("desc");
                  getNotes();
                }}
              >
                Newest
              </button>
              <button
                className={
                  checkDateData === "asc"
                    ? "activeDrop dropdown-item"
                    : "dropdown-item"
                }
                onClick={() => {
                  setCheckDateData("asc");
                  getNotes();
                }}
              >
                Oldest
              </button>
            </div>

            <div className="form-check d-inline" id="importantDiv">
              <input
                name="important"
                type="checkbox"
                className="form-check-input"
                checked={important}
                onChange={() => setImportant(!important)}
              />
              <label className="form-check-label">Important</label>
            </div>
          </div>

          <div className="notesContainer mt-4">
            {notes.map((note) => (
              <div className="note" key={note.id}>
                <p className="note--title">{note.data.title}</p>
                <p className="note--description">{note.data.description}</p>
                <p className="note--date">{note.data.createdAt}</p>
                {note.data.important === true && (
                  <i className="fa-solid fa-star"></i>
                )}
                <button className="edit" onClick={() => editNoteDir(note.id)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="delete" onClick={() => deleteNote(note.id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
