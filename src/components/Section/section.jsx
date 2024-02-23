import React, { useState, useEffect, useRef } from "react";
import { useData } from "../../Context/dataContext";
import add from "../../assets/icons/add.png";
import styles from "./section.module.css";
import Card from "../Card/card";
import collapse from "../../assets/icons/collapse.png";
import Create from "../createCard/createCard";
function Section({ item }) {
  const { data, toggleShowCreate } = useData();
  const [secData, setSecData] = useState();
  const [showCreate, setShowCreate] = useState(false);
  const cardRefs = useRef([]);

  const handleCollapseClick = () => {
    cardRefs.current.forEach((ref) => {
      if (ref && ref.current) {
        ref.current.collapse();
      }
    });
  };

  useEffect(() => {
    console.log("data ", data, item);
    setSecData(data[item]);
  }, [data[item]]);

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.title}>{item}</div>
        <div className={styles.titleOptions}>
          {" "}
          {item === "toDo" && (
            <p className={styles.add} onClick={() => toggleShowCreate(true)}>
              +
            </p>
          )}{" "}
          <img src={collapse} onClick={() => handleCollapseClick()} />
        </div>
      </div>
      <div className={styles.cardScrollContainer}>
        <div className={styles.cardScroll}>
          {secData &&
            item &&
            secData.map((card, index) => {
              cardRefs.current[index] = React.createRef();
              return (
                <Card
                  ref={cardRefs.current[index]}
                  key={card._id}
                  cardData={card}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Section;
