import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import Navpanel from "../Navpanel/navpanel";
import Board from "../Board/board";
import SettingsPage from "../Settings/settings";
import Analytics from "../Analytics/analytics";
import LogOut from "../Logout/logOut";
import Delete from "../Delete/delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [page, setPage] = useState("Board");
  const [deleteCard, setDeleteCard] = useState(false);

  // const changelogOut = (status) => {
  //   setLogOut(status);
  // };
  const changeDelete = (answer) => {
    setDeleteCard(answer);
  };
  const changeBoard = (page) => {
    console.log(page);
    setPage(page);
  };
  const renderPage = () => {
    switch (page) {
      case "Board":
        return <Board />;
      case "Analytics":
        return <Analytics />;
      case "Settings":
        return <SettingsPage />;
      default:
        return null;
    }
  };
  return (
    <div className={styles.home}>
      <Navpanel changeBoard={changeBoard} />
      {renderPage()}
      {/* {logOut && <LogOut changelogOut={changelogOut} />} */}
      {deleteCard && <Delete changeDelete={changeDelete} />}
    </div>
  );
}

export default Dashboard;
