import React, { useState } from "react";

import Navigation from "../../components/Navigation";
import Notes from "../../components/ListNotes";

export default function ListNotes_view() {
  const [showNav, setShowNav] = useState(false);

  /*** NAVIGATION TOGGLES ***/

  const toggleNavbar = (e) => {
    e.preventDefault();
    setShowNav((currentValue) => !currentValue);
  };

  return (
    <div id="wrapper" className={showNav ? "toggled" : ""}>
      <Navigation toggleNavbar={toggleNavbar} />
      {/* <div className={showSuccess ? "alert alert-success" : "hideDiv"} role="alert">
        The note has been added!
      </div> */}
      <Notes
        showNav={showNav}
        name="Title"
        description="Descriptions goes here.."
      />
    </div>
  );
}
