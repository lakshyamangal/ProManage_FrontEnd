import { useState } from "react";
import styles from "./register.module.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../apis/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (
        !data.name ||
        !data.email ||
        !data.password ||
        !data.confirmPassword
      ) {
        throw new Error("Fill in all the details");
      }
      if (data.confirmPassword != data.password)
        throw new Error("Passwords don't match");
      const response = await registerUser({ ...data });
      if (response) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userName", response.name);
        toast.success("User Registered Successfully", {
          onClose: () => navigate("/Dashboard"),
        });
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Register</h1>
      <input
        className={styles.input}
        name="name"
        value={data.name}
        onChange={handleChange}
        type={"text"}
        placeholder="Name"
      ></input>
      <input
        className={styles.input}
        name="email"
        value={data.email}
        onChange={handleChange}
        type={"email"}
        placeholder="Email"
      ></input>
      <input
        className={styles.input}
        name="password"
        value={data.password}
        onChange={handleChange}
        type={"password"}
        placeholder="Password"
      ></input>
      <input
        className={styles.input}
        name="confirmPassword"
        value={data.confirmPassword}
        onChange={handleChange}
        type={"password"}
        placeholder="Confirm Password"
      ></input>

      <button onClick={handleSubmit} className={styles.button}>
        Register
      </button>
      <p className={styles.footer}>
        Have an Account?
        <span className={styles.underline} onClick={redirectToLoginPage}>
          Log in
        </span>
      </p>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default Register;
