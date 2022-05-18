import React from "react";
import { Link } from "react-router-dom";
import NotFoundImg from "../images/PageNotFound.jpg";
import "../styles/PageNotFound.css";

export default function PageNotFound() {
  return (
    <div className="PNF">
      <h1>Page not found!</h1>
      <img src={NotFoundImg} />
      <p style={{ textAlign: "center" }}>
        <Link to="/react-app-notes">Go to login page</Link>
      </p>
    </div>
  );
}
