import React, { useState, useEffect } from "react";

import Navigation from "../../components/Navigation";
import Notes from "../../components/ListNotes";

import { authentication } from "../../lib/Firebase-config";

export default function ListNotes_view() {
  const [showNav, setShowNav] = useState(false);
  const [profileData, setProfileData] = useState("");

  /*** NAVIGATION TOGGLES ***/

  const toggleNavbar = (e) => {
    e.preventDefault();
    setShowNav((currentValue) => !currentValue);
  };

  return (
    <div id="wrapper" className={showNav ? "toggled" : ""}>
      <Navigation toggleNavbar={toggleNavbar} />
      <Notes showNav={showNav} />
    </div>
  );
}
