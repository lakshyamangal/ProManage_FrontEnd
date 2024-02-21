import React, { useState, useEffect } from "react";
import { getAllCards } from "../../apis/card";
import styles from "./board.module.css";
import Section from "../Section/section";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Board() {
  const name = localStorage.getItem("userName");
  const currentDate = moment();
  const formattedDate = currentDate.format("Do MMM, YYYY");
  const [data, setData] = useState(null);
  const [keys, setkeys] = useState([]);
  useEffect(() => {
    fetchAllData();
  }, []);
  const fetchAllData = async () => {
    console.log("dfsdgfhh");
    try {
      const data = await getAllCards("week");
      setData(data);
      setkeys(Object.keys(data));
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className={styles.board}>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div className={styles.title}>{`Welcome! ${name}`}</div>
          <div className={styles.date}>{formattedDate}</div>
        </div>
      </div>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div className={styles.title}>Board</div>
          <div className={styles.date}>This week</div>
        </div>
      </div>
      <div className={styles.scrollContainer}>
        <div className={styles.container}>
          {keys &&
            data &&
            keys.map((key) => {
              return (
                <Section item={key} data={data} fetchAllData={fetchAllData} />
              );
            })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Board;
