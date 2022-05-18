import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { authentication } from "../lib/Firebase-config";
import { signOut } from "firebase/auth";

export default function Navigation(props) {
  const [activeMenu, setActiveMenu] = useState();
  const [profileData, setProfileData] = useState("");
  const navigate = useNavigate();

  /*** CHECKING URL AND ADD CLASS ***/

  useEffect(() => {
    const url = window.location.pathname;

    if (url === "/home") {
      setActiveMenu("home");
    } else if (url === "/notes") {
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
      // navigate("/"); // FOR LOCALHOST
      navigate("/react-app-notes"); // FOR GP PAGES
    }
  }, []);

  /*** LOGGING OUT USER ***/

  const handleLogout = () => {
    signOut(authentication);
    sessionStorage.removeItem("Auth Token");
    setProfileData(null);
    // navigate("/"); // FOR LOCALHOST
    navigate("/react-app-notes"); // FOR GH PAGES
  };

  return (
    <>
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <h2>NOTES</h2>
        </div>
        <ul className="sidebar-nav">
          <Link to="/home" className={activeMenu === "home" ? "active" : ""}>
            <i className="fa-solid fa-house"></i>Home
          </Link>
          <Link className={activeMenu === "notes" ? "active" : ""} to="/notes">
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
          </div>
        </nav>
      </div>
    </>
  );
}
