import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDuration } from "../../Context/DurationContext";
import { useDeleteCard } from "../../Context/DeleteCardContext";
import { useData } from "../../Context/dataContext";
import styles from "./card.module.css";
import upArrow from "../../assets/icons/up.png";
import downArrow from "../../assets/icons/down.png";
import { statusChange, getCheckListCount } from "../../apis/card";
import Checkbox from "../Checkbox/Checkbox";
import Popup from "../Popup/Popup";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = forwardRef(({ cardData }, ref) => {
  const [collapsed, setCollapsed] = useState(true);
  const [checkListCount, setCheckListCount] = useState({});
  const [displayDueDate, setDisplayDueDate] = useState("");
  const [haveDueDate, setHaveDueDate] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#cf3636");
  const [showPopup, setShowPopup] = useState(false);
  const { fetchAllData, checkListCountToggle } = useData();
  const { duration } = useDuration();
  const handleStatusChange = async (cardId, status) => {
    await statusChange(cardId, status);
    await fetchAllData(duration);
  };

  const handleCollapseBtn = () => {
    setCollapsed(!collapsed);
  };

  useImperativeHandle(ref, () => ({
    collapse: () => {
      setCollapsed(true);
    },
  }));
  // console.log("element to be invoked", crudElement);
  const fetchCheckListCount = async (cardId) => {
    try {
      const response = await getCheckListCount(cardId);
      setCheckListCount(response);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const dotHandler = () => {
    //setShowPopup(!showPopup);
    setShowPopup(true);
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
    fetchCheckListCount(cardData._id);
  }, [cardData, checkListCountToggle]);
  const keys = ["toDo", "backlog", "inProgress", "done"];

  return (
    <div className={styles.card}>
      <div className={styles.cardheader}>
        <div className={styles.priority}>
          {" "}
          <div className={styles.bullet}></div>
          {`${cardData.priority} priority`}
        </div>
        {/* <img onClick={dotHandler} src={dots} /> */}
        <div onClick={dotHandler}>
          <b className={styles.dots}>...</b>
          {showPopup && <Popup cardData={cardData} />}
        </div>
      </div>
      <div className="cardTitle">{cardData.title}</div>
      <div className="checkLists">
        <div className={styles.checkList}>
          <div className="checkHead">
            CheckList ({checkListCount?.completedChecklistItems}/
            {checkListCount?.totalChecklistItems})
          </div>
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
});
export default Card;
