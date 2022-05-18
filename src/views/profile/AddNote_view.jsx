import React, { useState } from "react";

import Navigation from "../../components/Navigation";
import AddNote from "../../components/AddNote";

export default function AddNote_view() {
  const [showNav, setShowNav] = useState(false);

  /*** NAVIGATION TOGGLES ***/

  const toggleNavbar = (e) => {
    e.preventDefault();
    setShowNav((currentValue) => !currentValue);
  };

  return (
    <div id="wrapper" className={showNav ? "toggled" : ""}>
      <Navigation toggleNavbar={toggleNavbar} />
      <AddNote />
    </div>
  );
}
