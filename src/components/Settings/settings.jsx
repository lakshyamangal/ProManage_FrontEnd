import React, { useState } from "react";
import styles from "./settingsPage.module.css";
import user from "../../assets/icons/user.png";
import lock from "../../assets/icons/lock.png";
import eye from "../../assets/icons/eye.png";

function SettingsPage() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to backend API (PUT request)
    console.log(formData);
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
    </div>
  );
}

export default SettingsPage;
