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
          // path="/" // FOR LOCALHOST
          path="/react-app-notes" // FOR GP PAGES
          element={<Login_view title="Login" setProfileData={setProfileData} />}
        />
        <Route
          path="/register"
          element={
            <Register_view title="Register" setProfileData={setProfileData} />
          }
          exact
        />
        <Route path="/home" element={<Home_view />} exact />
        <Route path="/notes" element={<Notes_view />} exact />
        <Route path="/addnote" element={<AddNote_view />} exact />
        <Route path="/editnote" element={<EditNote_view />} exact />
      </Routes>
    </main>
  );
}

export default App;
