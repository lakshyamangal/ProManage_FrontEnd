import React, { useEffect, useState } from "react";
import styles from "./analytics.module.css";
import { getAllAnalytics } from "../../apis/analytics";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Analytics() {
  const [analytics, setAnalytics] = useState({});
  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchAllAnalytics();
  }, []);

  const fetchAllAnalytics = async () => {
    try {
      const response = await getAllAnalytics();
      setAnalytics(response);
    } catch (error) {
      console.log(error.message);
      setErrorFlag(true);
      setErrorMessage(error.message);
    }
  };
  return (
    <div className={styles.analytics}>
      <h2 className={styles.title}>Analytics</h2>
      {analytics && (
        <div className={styles.outerContainer}>
          <div className={styles.container}>
            <div>
              <p>Backlog Tasks</p>
              <p>{analytics?.status?.backlog}</p>
            </div>
            <div>
              <p>To-do Tasks</p>
              <p>{analytics?.status?.toDo}</p>
            </div>
            <div>
              <p>In-Progress Tasks</p>
              <p>{analytics?.status?.inProgress}</p>
            </div>
            <div>
              <p>Completed Tasks</p>
              <p>{analytics?.status?.done}</p>
            </div>
          </div>
          <div className={styles.container}>
            <div>
              <p>Low Priority</p>
              <p>{analytics?.priority?.low}</p>
            </div>
            <div>
              <p>Moderate Priority</p>
              <p>{analytics?.priority?.moderate}</p>
            </div>
            <div>
              <p>High Priority</p>
              <p>{analytics?.priority?.high}</p>
            </div>
            <div>
              <p>Due Date Tasks</p>
              <p>{analytics?.dueDate}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
