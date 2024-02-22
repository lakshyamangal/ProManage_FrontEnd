import React, { useState, useEffect } from "react";
import styles from "./card.module.css";
import upArrow from "../../assets/icons/up.png";
import downArrow from "../../assets/icons/down.png";
import { statusChange } from "../../apis/card";
import Checkbox from "../Checkbox/Checkbox";
import moment from "moment";

const Card = ({ data, fetchAllData }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [displayDueDate, setDisplayDueDate] = useState("");
  const [haveDueDate, setHaveDueDate] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#cf3636");

  const handleStatusChange = async (key, cardId) => {
    await statusChange(cardId, key);
    await fetchAllData();
  };
  const handleCollapseBtn = () => {
    setCollapsed(!collapsed);
    //fetchAllData();
  };

  useEffect(() => {
    data.dueDate == null ? setHaveDueDate(false) : setHaveDueDate(true);
    const dueDate = moment(data.dueDate);
    const currentDateMoment = moment();
    const isAfter = currentDateMoment.isAfter(dueDate);

    const color =
      data.status == "done" ? "#63c05b" : isAfter ? "#cf3636" : "#5a5a5a";
    setBackgroundColor(color);
    setDisplayDueDate(dueDate.format("MMM DD"));
    console.log(isAfter);
  }, [data]);
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
                key={items._id}
                items={items}
                CardId={data._id}
                fetchAllData={fetchAllData}
              />
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
              if (!data.status.includes(key)) {
                return (
                  <div
                    key={key}
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
