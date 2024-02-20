import React, { useEffect } from "react";
import styles from "./card.module.css";
import { editCheckList } from "../../apis/card";

const Card = ({ data, item }) => {
  const handleCheckboxChange = (event, itemId) => {
    console.log("checklist data ", event, itemId);
    // editCheckList();
  };

  useEffect(() => {
    console.log("keys ", data);
  }, []);
  const keys = ["toDo", "backlog", "inProgress", "done"];

  return (
    <div className={styles.card}>
      <div className={styles.cardheader}>
        <div className={styles.bullet}></div>
        <div className="priority">{`${data.priority} priority`}</div>
      </div>
      <div className="cardTitle">{data.title}</div>
      <div className="checkLists">
        <div className="checkTitle">Checklist (1/3)</div>
        {data &&
          data.checkList.map((items) => {
            return (
              <div className={styles.checkList}>
                <div className={styles.checkbox}>
                  <input
                    type="checkbox"
                    id={items._id}
                    name={items.title}
                    checked={items.isCompleted}
                    onChange={(e) => handleCheckboxChange(e, data._id)}
                  />
                </div>
                <div className="checkTitle">{items.title}</div>
              </div>
            );
          })}
        <div className={styles.cardFooter}>
          <div className={styles.date}>Feb 10th</div>
          <div className={styles.switchSection}>
            {keys.map((key) => (
              <div className={styles.sectionBtn}>{key}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
