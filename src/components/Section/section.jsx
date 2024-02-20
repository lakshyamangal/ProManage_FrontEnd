import React, { useState, useEffect } from "react";
import styles from "./section.module.css";
import Card from "../Card/card";
function Section({ item, data }) {
  const [cardData, setCardData] = useState();
  useEffect(() => {
    console.log("data ", data[item], item);
    setCardData(data[item]);
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>{item}</div>
      <div className={styles.cards}>
        {cardData &&
          item &&
          cardData.map((card) => {
            return <Card data={card} keys={item} />;
          })}
      </div>
    </div>
  );
}

export default Section;
