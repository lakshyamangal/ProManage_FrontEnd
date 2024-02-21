import React, { useState, useEffect } from "react";
import styles from "./card.module.css";
import upArrow from "../../assets/icons/up.png";
import downArrow from "../../assets/icons/down.png";
import { statusChange } from "../../apis/card";
import Checkbox from "../Checkbox/Checkbox";
const Card = ({ data, key, fetchAllData }) => {
  const [cardData, setCardData] = useState(data);
  const [collapsed, setCollapsed] = useState(true);
  const handleStatusChange = (key, cardId) => {
    statusChange(cardId, key);
    fetchAllData();
  };
  const handleCollapseBtn = () => {
    setCollapsed(!collapsed);
    fetchAllData();
  };

  useEffect(() => {
    console.log("keys ", data);
  }, [cardData]);
  const keys = ["toDo", "backlog", "inProgress", "done"];

  return (
    <div className={styles.card}>
      <div className={styles.cardheader}>
        <div className={styles.bullet}></div>
        <div className="priority">{`${data.priority} priority`}</div>
      </div>
      <div className="cardTitle">{data.title}</div>
      <div className="checkLists">
        <div className={styles.checkList}>
          <div className="checkHead">CheckList (1/3)</div>
          <div className="collapseIcon" onClick={handleCollapseBtn}>
            <img src={collapsed ? downArrow : upArrow} alt="logo" />
          </div>
        </div>
        {!collapsed &&
          data &&
          data.checkList &&
          data.checkList.map((items) => {
            console.log("data ", data._id);
            return (
              <Checkbox
                items={items}
                CardId={data._id}
                fetchAllData={fetchAllData}
              />
            );
          })}
        <div className={styles.cardFooter}>
          <div className={styles.date}>Feb 10th</div>
          <div className={styles.switchSection}>
            {keys.map((key) => {
              if (!data.status.includes(key)) {
                return (
                  <div
                    className={styles.sectionBtn}
                    onClick={() => handleStatusChange(key, data._id)}
                  >
                    {key}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
