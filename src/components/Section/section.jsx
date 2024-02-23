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
      <div className={styles.sectionTitle}>
        <div>{item}</div>
        {item === "toDo" && (
          <img src={add} onClick={() => toggleShowCreate(true)} />
        )}
        <img src={collapse} onClick={() => handleCollapseClick()} />
      </div>
      <div className={styles.cards}>
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
  );
}

export default Section;
