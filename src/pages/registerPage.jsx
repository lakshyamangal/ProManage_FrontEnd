import React from "react";
import Register from "../components/regsister/register";
import loginImage from "../assets/images/login.png";

function RegisterPage() {
  return (
    <div style={{ display: "flex", background: "#17a2b8" }}>
      <img
        style={{ maxHeight: "100vh", width: "60vw" }}
        src={loginImage}
        alt="Login cover"
      />
      <Register />
    </div>
  );
}

export default RegisterPage;
