import React, { useState, useEffect } from "react";
import { useData } from "../../Context/dataContext";
import styles from "./section.module.css";
import Card from "../Card/card";
function Section({ item }) {
  const { data } = useData();
  const [secData, setSecData] = useState();
  useEffect(() => {
    console.log("data ", data, item);
    setSecData(data[item]);
  }, [data[item]]);

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>{item}</div>
      <div className={styles.cards}>
        {secData &&
          item &&
          secData.map((card) => {
            return <Card key={card._id} cardData={card} />;
          })}
      </div>
    </div>
  );
}

export default Section;
