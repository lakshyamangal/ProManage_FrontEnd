import React from "react";
import Login from "../components/Login/Login";
import loginImage from "../assets/images/login.png";

function LoginPage() {
  return (
    <div style={{ display: "flex", background: "#17A2B8" }}>
      <img
        style={{ maxHeight: "100vh", width: "60vw" }}
        src={loginImage}
        alt="Login cover"
      />
      <Login />
    </div>
  );
}

export default LoginPage;
