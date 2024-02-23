import React, { useState } from "react";
import styles from "../Popup/Popup.module.css";
import Delete from "../Delete/delete";
import Edit from "../Edit/Edit";

const Popup = ({ cardData }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const openDeleteModal = () => {
    setShowDelete(true);
  };

  const closeDeleteModal = () => {
    setShowDelete(false);
  };

  const openEditModal = () => {
    setShowEdit(true);
  };

  const closeEditModal = () => {
    setShowEdit(false);
  };
  return (
    <div className={styles.popupContainer}>
      <div className={styles.crudOptions} onClick={openEditModal}>
        Edit
      </div>
      <div className={styles.crudOptions}>Share</div>
      <div>
        {showEdit && (
          <Edit cardData={cardData} closeEditModal={closeEditModal} />
        )}
      </div>
      <div
        className={styles.crudOptions}
        style={{ color: "#CF3636" }}
        onClick={openDeleteModal}
      >
        Delete
      </div>
      {showDelete && (
        <Delete cardData={cardData} closeDeleteModal={closeDeleteModal} />
      )}
    </div>
  );
};

export default Popup;
