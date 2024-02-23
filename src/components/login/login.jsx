import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!data.email || !data.password) {
        throw new Error("Fill in all the information");
      }
      const response = await loginUser({ ...data });

      if (response) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userName", response.name);
        toast.success("Logged in Successfully", {
          onClose: () => navigate("/Dashboard"),
        });
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Login</h1>
      <input
        className={styles.input}
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Email"
        type={"email"}
      ></input>
      <input
        className={styles.input}
        name="password"
        value={data.password}
        onChange={handleChange}
        placeholder="Password"
        type={"password"}
      ></input>
      <button onClick={handleSubmit} className={styles.button}>
        Log In
      </button>
      <p className={styles.footer}>
        Have no account yet?
        <span
          onClick={() => navigate("/register")}
          className={styles.underline}
        >
          Register
        </span>
      </p>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default Login;
