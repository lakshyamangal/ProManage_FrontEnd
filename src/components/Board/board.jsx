import React, { useState, useEffect } from "react";
import { getAllCards } from "../../apis/card";
import DurationDropdown from "../DurationDropdown/DurationDropdown";
import { useDuration } from "../../Context/DurationContext";
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
  const { duration, updateDuration } = useDuration();

  useEffect(() => {
    fetchAllData();
  }, [duration]);

  const fetchAllData = async () => {
    console.log("dfsdgfhh");
    try {
      const data = await getAllCards(duration);
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
          <DurationDropdown />
        </div>
      </div>
      <div className={styles.scrollContainer}>
        <div className={styles.container}>
          {keys &&
            data &&
            keys.map((k) => {
              return (
                <Section
                  key={k}
                  item={k}
                  data={data[k]}
                  fetchAllData={fetchAllData}
                />
              );
            })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Board;
