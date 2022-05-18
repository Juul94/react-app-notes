import "./styles/App.css";
import "./styles/Profile.css";
import "./styles/Imports.css";
import "./styles/Variables.css";
import "./styles/Notes.css";

import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Login_view from "./views/Login_view";
import Register_view from "./views/Register_view";

import Home_view from "./views/profile/Home_view";
import Notes_view from "./views/profile/ListNotes_view";
import AddNote_view from "./views/profile/AddNote_view";
import EditNote_view from "./views/profile/EditNote_view";

function App() {
  const [profileData, setProfileData] = useState("");

  return (
    <main>
      <Routes>
        <Route
          // FOR GB PAGES
          // path="/"
          path="/react-app-notes"
          element={<Login_view title="Login" setProfileData={setProfileData} />}
        />
        <Route
          // path="/register"
          path="/react-app-notes/register"
          element={
            <Register_view title="Register" setProfileData={setProfileData} />
          }
          exact
        />
        <Route
          // path="/home"
          path="react-app-notes/home"
          element={<Home_view />}
          exact
        />
        <Route
          //  path="/notes"
          path="react-app-notes/notes"
          element={<Notes_view />}
          exact
        />
        <Route
          // path="/addnote"
          path="react-app-notes/addnote"
          element={<AddNote_view />}
          exact
        />
        <Route
          // path="/editnote"
          path="react-app-notes/editnote"
          element={<EditNote_view />}
          exact
        />
      </Routes>
    </main>
  );
}

export default App;
