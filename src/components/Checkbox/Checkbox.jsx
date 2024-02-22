import React, { useState, useEffect } from "react";
import styles from "./Checkbox.module.css";
import { editCheckList } from "../../apis/card";
import { toast } from "react-toastify";
// import { useData } from "../../Context/dataContext";
// import { useDuration } from "../../Context/DurationContext";
const Checkbox = ({ item, CardId }) => {
  // const { fetchAllData } = useData();
  // const { duration } = useDuration();
  const [isChecked, setIsChecked] = useState(item.isCompleted);
  const handleCheckboxChange = async (event, itemId, CardId) => {
    const prevValue = isChecked;
    try {
      setIsChecked(event.target.checked);
      await editCheckList(CardId, itemId, event.target.checked);
    } catch (error) {
      setIsChecked(prevValue);
      toast.error(error.message);
    }
  };
  return (
    <div className={styles.checkList}>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          id={item._id}
          name={item.title}
          checked={isChecked}
          value={isChecked}
          onChange={(e) => handleCheckboxChange(e, item._id, CardId)}
        />
      </div>
      <div className="checkTitle">{item.title}</div>
    </div>
  );
};

export default Checkbox;
