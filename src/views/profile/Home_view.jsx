import React, { useState, useEffect } from "react";

import Navigation from "../../components/Navigation";
import Home from "../../components/Home";

import { authentication } from "../../lib/Firebase-config";

export default function Home_view() {
  const [showNav, setShowNav] = useState(false);
  const [profileData, setProfileData] = useState("");

  /*** NAVIGATION TOGGLES ***/

  const toggleNavbar = (e) => {
    e.preventDefault();
    setShowNav((currentValue) => !currentValue);
  };

  /*** GET USER DATA ***/

  useEffect(() => {
    authentication.onAuthStateChanged(function (user) {
      setProfileData(user);
    });
  }, []);

  return (
    <div id="wrapper" className={showNav ? "toggled" : ""}>
      <Navigation toggleNavbar={toggleNavbar} />
      <Home data={profileData} showNav={showNav} />
    </div>
  );
}
