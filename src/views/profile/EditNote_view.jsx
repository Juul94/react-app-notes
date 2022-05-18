import React, { useState } from "react";

import Navigation from "../../components/Navigation";
import EditNote from "../../components/EditNote";

export default function Home_view() {
  const [showNav, setShowNav] = useState(false);

  /*** NAVIGATION TOGGLES ***/

  const toggleNavbar = (e) => {
    e.preventDefault();
    setShowNav((currentValue) => !currentValue);
  };

  return (
    <div id="wrapper" className={showNav ? "toggled" : ""}>
      <Navigation toggleNavbar={toggleNavbar} />
      <EditNote />
    </div>
  );
}
