import React from "react";
import styles from "./logOut.module.css";

function LogOut({ changelogOut }) {
  return (
    <div className={styles.logOut}>
      <div className={styles.box}>
        <p className={styles.message}>Are you sure you want to Logout?</p>
        <p className={styles.yes}>Yes, Logout</p>
        <p className={styles.cancel} onClick={() => changelogOut(false)}>
          Cancel
        </p>
      </div>
    </div>
  );
}

export default LogOut;
