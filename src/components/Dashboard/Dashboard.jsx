import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import Navpanel from "../Navpanel/navpanel";
import Board from "../Board/board";
import Settings from "../Settings/settings";
import Analytics from "../Analytics/analytics";
import LogOut from "../Logout/logOut";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [page, setPage] = useState("Board");
  const [logOut, setLogOut] = useState(false);
  const changelogOut = (status) => {
    setLogOut(status);
  };
  const changeBoard = (page) => {
    console.log(page);
    setPage(page);
  };
  return (
    <div className={styles.home}>
      <Navpanel changeBoard={changeBoard} changelogOut={changelogOut} />
      {page == "Board" ? (
        <Board />
      ) : page == "Analytics" ? (
        <Analytics />
      ) : (
        <Settings />
      )}
      {logOut && <LogOut changelogOut={changelogOut} />}
    </div>
  );
}

export default Dashboard;
