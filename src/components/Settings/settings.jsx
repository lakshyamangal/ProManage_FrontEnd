import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../apis/auth";
import styles from "./settingsPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import user from "../../assets/icons/user.png";
import lock from "../../assets/icons/lock.png";
import eye from "../../assets/icons/eye.png";
import hide from "../../assets/icons/hide.png";

function SettingsPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: localStorage.getItem("userName"),
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleOldPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleNewPassword = () => {
    setShowNewPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (formData.name.trim() == "") throw new Error("Name is required!");
      if (!formData.oldPassword.trim())
        throw new Error("Old Password is required");
      if (formData.oldPassword == formData.newPassword)
        throw new Error("New Password should be different");
      const response = await updateUser(formData);
      console.log(response);
      localStorage.removeItem("userName");
      localStorage.removeItem("token");
      toast.success("User Details Updated Successfully", {
        autoClose: 500,
        onClose: () => {
          navigate("/login");
        },
      });
    } catch (err) {
      toast.error(err.message, {
        autoClose: 1500,
      });
    }
  };

  return (
    <div className={styles.settingsPage}>
      <h2 className={styles.title}>Settings</h2>
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <img className={styles.leftImg} src={user} />
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <img src={lock} className={styles.leftImg} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Old Password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
          />
          <img
            src={showPassword ? hide : eye}
            className={styles.rightImg}
            alt="Toggle password visibility"
            onClick={toggleOldPassword}
          />
        </div>
        <div className={styles.input}>
          <img src={lock} className={styles.leftImg} />
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <img
            src={showNewPassword ? hide : eye}
            className={styles.rightImg}
            alt="Toggle password visibility"
            onClick={toggleNewPassword}
          />
        </div>
        <button className={styles.update} type="submit">
          Update
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SettingsPage;
