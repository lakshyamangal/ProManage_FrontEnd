import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../apis/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./settingsPage.module.css";
import user from "../../assets/icons/user.png";
import lock from "../../assets/icons/lock.png";
import eye from "../../assets/icons/eye.png";

function SettingsPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await updateUser(formData);
      console.log(response);
      localStorage.removeItem("userName");
      localStorage.removeItem("token");
      toast.success("User Details Updated Successfully", {
        onClose: () => {
          navigate("/login");
        },
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.settingsPage}>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.input}>
          <img src={user} />
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <img src={lock} />
          <input
            type="password"
            placeholder="Old Password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
          />
          <img src={eye} />
        </div>
        <div className={styles.input}>
          <img src={lock} />
          <input
            type="password"
            placeholder="New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <img src={eye} />
        </div>
        <button type="submit">Update</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SettingsPage;
