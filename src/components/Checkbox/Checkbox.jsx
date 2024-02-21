import React, { useState, useEffect } from "react";
import styles from "./Checkbox.module.css";
import { editCheckList } from "../../apis/card";
import { toast } from "react-toastify";
const Checkbox = (items, CardId, fetchAllData) => {
  const [isChecked, setIsChecked] = useState(items.items.isCompleted);
  useEffect(() => {
    console.log("values ", items, CardId);
  }, []);
  const handleCheckboxChange = async (event, itemId, CardId) => {
    const value = isChecked;
    items.fetchAllData();
    try {
      setIsChecked(!isChecked);
      await editCheckList(CardId, itemId, event.target.checked);
    } catch (error) {
      setIsChecked(value);
      toast.error(error.message);
    }
  };
  return (
    <div className={styles.checkList}>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          id={items._id}
          name={items.title}
          checked={isChecked}
          value={isChecked}
          onChange={(e) =>
            handleCheckboxChange(e, items.items._id, items.CardId)
          }
        />
      </div>
      <div className="checkTitle">{items.items.title}</div>
    </div>
  );
};

export default Checkbox;
