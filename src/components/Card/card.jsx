import React, { useState, useEffect } from "react";
import { useDuration } from "../../Context/DurationContext";
import { useData } from "../../Context/dataContext";
import styles from "./card.module.css";
import upArrow from "../../assets/icons/up.png";
import downArrow from "../../assets/icons/down.png";
import { statusChange } from "../../apis/card";
import Checkbox from "../Checkbox/Checkbox";
import moment from "moment";

const Card = ({ cardData }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [displayDueDate, setDisplayDueDate] = useState("");
  const [haveDueDate, setHaveDueDate] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#cf3636");
  const { fetchAllData } = useData();
  const { duration } = useDuration();
  const handleStatusChange = async (cardId, status) => {
    await statusChange(cardId, status);
    await fetchAllData(duration);
  };
  const handleCollapseBtn = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    cardData.dueDate == null ? setHaveDueDate(false) : setHaveDueDate(true);
    const dueDate = moment(cardData.dueDate);
    const currentDateMoment = moment();
    const isAfter = currentDateMoment.isAfter(dueDate);

    const color =
      cardData.status == "done" ? "#63c05b" : isAfter ? "#cf3636" : "#5a5a5a";
    setBackgroundColor(color);
    setDisplayDueDate(dueDate.format("MMM DD"));
    console.log(isAfter);
  }, [cardData]);
  const keys = ["toDo", "backlog", "inProgress", "done"];

  return (
    <div className={styles.card}>
      <div className={styles.cardheader}>
        <div className={styles.bullet}></div>
        <div className="priority">{`${cardData.priority} priority`}</div>
      </div>
      <div className="cardTitle">{cardData.title}</div>
      <div className="checkLists">
        <div className={styles.checkList}>
          <div className="checkHead">CheckList (1/3)</div>
          <div className="collapseIcon" onClick={handleCollapseBtn}>
            <img src={collapsed ? downArrow : upArrow} alt="logo" />
          </div>
        </div>
        {!collapsed &&
          cardData &&
          cardData.checkList &&
          cardData.checkList.map((item) => {
            console.log("cardData ", cardData._id);
            return (
              <Checkbox key={item._id} item={item} CardId={cardData._id} />
            );
          })}
        <div className={styles.cardFooter}>
          <div>
            {haveDueDate && (
              <div
                style={{ backgroundColor: backgroundColor }}
                className={styles.date}
              >
                {displayDueDate}
              </div>
            )}
          </div>
          <div className={styles.switchSection}>
            {keys.map((key) => {
              if (!cardData.status.includes(key)) {
                return (
                  <div
                    key={key}
                    className={styles.sectionBtn}
                    onClick={() => handleStatusChange(cardData._id, key)}
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
