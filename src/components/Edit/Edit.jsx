import React, { useState } from "react";
import styles from "./Edit.module.css";
import moment from "moment";
import { editCard } from "../../apis/card";
import { useData } from "../../Context/dataContext";
import { useEditCard } from "../../Context/editContext";
import { useDuration } from "../../Context/DurationContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-calendar/dist/Calendar.css";

function Edit({ cardData }) {
  const defaultTitle = cardData && cardData.title ? cardData.title : "";
  const defaultPriority =
    cardData && cardData.priority ? cardData.priority : "";
  const defaultChecklistItems =
    cardData && cardData.checkList ? cardData.checkList : [];
  const defaultSelectedDate =
    cardData && cardData.dueDate
      ? moment(cardData.dueDate).format("YYYY-MM-DD")
      : "";

  console.log("default checkList is ---------->", cardData);
  const [title, setTitle] = useState(defaultTitle);
  const [priority, setPriority] = useState(defaultPriority);
  const [checklistItems, setChecklistItems] = useState(defaultChecklistItems);
  const [selectedDate, setSelectedDate] = useState(defaultSelectedDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { fetchAllData } = useData();
  const { duration } = useDuration();
  const { updateCardId } = useEditCard();
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleAddChecklistItem = () => {
    setChecklistItems([...checklistItems, { title: "", isCompleted: false }]);
  };

  const handleChecklistItemChange = (index, field, value) => {
    const updatedItems = [...checklistItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setChecklistItems(updatedItems);
  };

  const handleDeleteChecklistItem = (index) => {
    const updatedItems = [...checklistItems];
    updatedItems.splice(index, 1);
    setChecklistItems(updatedItems);
  };

  const handleCancel = () => {
    // closeEditModal();
    updateCardId(null);
  };

  const handleSave = async () => {
    console.log("------------------>", checklistItems);
    await editCardHandler(
      cardData._id,
      title,
      priority,
      checklistItems,
      selectedDate
    );
    await fetchAllData(duration);
    // closeEditModal();
    updateCardId(null);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setShowDatePicker(false);
  };

  const handleToggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const editCardHandler = async (
    cardId,
    title,
    priority,
    checklistItems,
    dueDate
  ) => {
    try {
      const isoDate = moment(dueDate, "YYYY-MM-DD").toISOString();
      console.log("card id is --------->", cardId);
      const response = await editCard(
        cardId,
        title,
        priority,
        checklistItems,
        isoDate
      );
      toast.success("Card Created Successfully", {
        autoClose: 1000,
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.create}>
      <div className={styles.box}>
        <p className={styles.title}>Title</p>
        <input
          name="title"
          placeholder="Enter Task Title"
          value={title}
          onChange={handleTitleChange}
        />
        <div className={styles.priority}>
          <div>Select Priority</div>
          <label>
            <input
              type="radio"
              name="priority"
              value="high"
              checked={priority === "high"}
              onChange={handlePriorityChange}
            />
            High Priority
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="moderate"
              checked={priority === "moderate"}
              onChange={handlePriorityChange}
            />
            Moderate Priority
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="low"
              checked={priority === "low"}
              onChange={handlePriorityChange}
            />
            Low Priority
          </label>
        </div>
        <div className={styles.checklist}>
          CheckList({checklistItems.filter((item) => item.checked).length}/
          {checklistItems.length})
          {checklistItems.map((item, index) => (
            <div key={index} className={styles.checklistItem}>
              <input
                type="checkbox"
                id={`item-${index}`}
                checked={item.isCompleted}
                onChange={(e) =>
                  handleChecklistItemChange(
                    index,
                    "isCompleted",
                    e.target.checked
                  )
                }
              />
              <input
                type="title"
                value={item.title}
                onChange={(e) =>
                  handleChecklistItemChange(index, "title", e.target.value)
                }
              />
              <button onClick={() => handleDeleteChecklistItem(index)}>
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className={styles.addNew} onClick={handleAddChecklistItem}>
          + Add New
        </div>
        <div>
          {showDatePicker ? (
            <input
              type="date"
              id="dueDate"
              value={selectedDate}
              onChange={handleDateChange}
            />
          ) : (
            <button onClick={handleToggleDatePicker}>
              {selectedDate ? selectedDate : "Select Due Date"}
            </button>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.cancel} onClick={handleCancel}>
            Cancel
          </div>
          <div className={styles.save} onClick={handleSave}>
            Save
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
