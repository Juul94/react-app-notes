// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { authentication } from "../utils/Firebase-config";

// export default function authToken() {
//   const navigate = useNavigate();
//   const [profileData, setProfileData] = useState("");

//   useEffect(() => {
//     let authToken = sessionStorage.getItem("Auth Token");

//     authentication.onAuthStateChanged(function (user) {
//       setProfileData(user);
//     });

//     if (authToken) {
//       navigate("/profile");
//     }
//   }, []);
// }
