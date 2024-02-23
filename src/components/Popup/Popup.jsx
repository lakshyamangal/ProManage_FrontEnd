import React, { useState, useRef, useEffect } from "react";
import styles from "../Popup/Popup.module.css";
import Delete from "../Delete/delete";
import Edit from "../Edit/Edit";
import { useEditCard } from "../../Context/editContext";
import { useDeleteCard } from "../../Context/DeleteCardContext";

const Popup = ({ cardData, hidePopup, showPopup, dotHandler }) => {
  const { updateDelCardId } = useDeleteCard();
  let count = 0;
  const { updateCardId, updateKey } = useEditCard();
  const openDeleteModal = () => {
    updateDelCardId(cardData);
    dotHandler(false);
    // setShowDelete(true);
  };

  const closeDeleteModal = () => {
    updateDelCardId(null);
    // setShowDelete(false);
  };

  const openEditModal = () => {
    updateCardId(cardData);
    // setShowEdit(true);
  };

  const closeEditModal = () => {
    // setShowEdit(false);
    updateCardId(null);
    updateKey(null);
  };
  const divRef = useRef(null);
  // Function to handle clicks outside of the div
  const handleClickOutside = (event) => {
    if (
      count % 2 !== 0 &&
      divRef.current &&
      !divRef.current.contains(event.target)
    ) {
      hidePopup(false);
    }
    count = count + 1;
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className={styles.popupContainer} ref={divRef}>
      <div className={styles.crudOptions} onClick={openEditModal}>
        Edit
      </div>
      <div className={styles.crudOptions}>Share</div>
      <div>
        {/* {showEdit && (
          <Edit cardData={cardData} closeEditModal={closeEditModal} />
        )} */}
      </div>
      <div
        className={styles.crudOptions}
        style={{ color: "#CF3636" }}
        onClick={openDeleteModal}
      >
        Delete
      </div>
      {/* {showDelete && (
        <Delete cardData={cardData} closeDeleteModal={closeDeleteModal} />
      )} */}
    </div>
  );
};

export default Popup;
