import React, { useState, useEffect } from "react";
import { getAllCards } from "../../apis/card";
import styles from "./Dashboard.module.css";
import Navpanel from "../Navpanel/navpanel";
import Section from "../Section/section";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [data, setData] = useState(null);
  const [keys, setkeys] = useState([]);
  console.log(keys);
  useEffect(() => {
    fetchAllData();
  }, []);
  const fetchAllData = async () => {
    try {
      const data = await getAllCards(1608460307000, 1708460307000);
      setData(data);
      setkeys(Object.keys(data));
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className={styles.home}>
      <div className="navbar">
        <Navpanel />
      </div>
      <div className="board">
        <div className={styles.dashboard}>
          <div className={styles.header}>
            <div className="title">Welcome! Kumar</div>
            <div className="date">19th feb 2024</div>
          </div>
        </div>
        <div className={styles.dashboard}>
          <div className={styles.header}>
            <div className="title">Board</div>
            <div className="date">This week</div>
          </div>
        </div>
        <div className={styles.scrollContainer}>
          <div className={styles.container}>
            {keys &&
              data &&
              keys.map((key) => {
                return <Section item={key} data={data} />;
              })}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
