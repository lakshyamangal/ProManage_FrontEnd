import React, { useState } from "react";
import styles from "./createCard.module.css";
import moment from "moment";
import { createCard } from "../../apis/card";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-calendar/dist/Calendar.css";
import { useData } from "../../Context/dataContext";
import { useDuration } from "../../Context/DurationContext";

function Create() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [checklistItems, setChecklistItems] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const { toggleShowCreate, fetchAllData } = useData();
  const { duration } = useDuration();

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
    toggleShowCreate(false);
  };

  const handleSave = async () => {
    console.log("------------------>", checklistItems);
    await createCardHandler(title, priority, checklistItems, selectedDate);
    await fetchAllData(duration);
    toggleShowCreate(false);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setShowDatePicker(false);
  };

  const handleToggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const createCardHandler = async (
    title,
    priority,
    checklistItems,
    dueDate
  ) => {
    try {
      const isoDate = moment(dueDate, "YYYY-MM-DD").toISOString();
      const response = await createCard(
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
                checked={item.checked}
                onChange={(e) =>
                  handleChecklistItemChange(
                    index,
                    "isCompleted",
                    e.target.checked
                  )
                }
              />
              <input
                type="text"
                value={item.text}
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

export default Create;
