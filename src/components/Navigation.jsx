import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { authentication } from "../lib/Firebase-config";
import { signOut } from "firebase/auth";

export default function Navigation(props) {
  const [activeMenu, setActiveMenu] = useState();
  const [profileData, setProfileData] = useState("");
  const navigate = useNavigate();

  /*** GET USER DATA ***/

  useEffect(() => {
    authentication.onAuthStateChanged(function (user) {
      setProfileData(user);
    });
  }, []);

  /*** CHECKING URL AND ADD CLASS ***/

  useEffect(() => {
    const url = window.location.pathname;

    if (url === "/notes") {
      setActiveMenu("notes");
    } else if (url === "/addnote") {
      setActiveMenu("addnote");
    }
  });

  /*** CHECKING USER AUTHENTICAION ***/

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    authentication.onAuthStateChanged(function (user) {
      setProfileData(user);
    });

    if (!authToken) {
      navigate("/react-app-notes");
    }
  }, []);

  /*** LOGGING OUT USER ***/

  const handleLogout = () => {
    signOut(authentication);
    sessionStorage.removeItem("Auth Token");
    setProfileData(null);
    navigate("/react-app-notes");
  };

  return (
    <>
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <h2>NOTES</h2>
        </div>
        <ul className="sidebar-nav">
          <Link to="/notes" className={activeMenu === "notes" ? "active" : ""}>
            <i className="fa-solid fa-note-sticky"></i>View notes
          </Link>
          <Link
            className={activeMenu === "addnote" ? "active" : ""}
            to="/addnote"
          >
            <i className="fa-solid fa-plus"></i>Add note
          </Link>
          <Link to="/react-app-notes" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>Sign out
          </Link>
        </ul>
      </aside>

      <div id="navbar-wrapper">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button className="navbar-brand" onClick={props.toggleNavbar}>
                <i className="fa fa-bars"></i>
              </button>
            </div>
            <div className="d-inline text-right" id="userInfo">
              <div className="d-block">
                <i className="fa-solid fa-user"></i>
                {profileData.displayName}
              </div>
              <div className="d-block">
                <i className="fa-solid fa-envelope"></i>
                {profileData.email}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
