import React from "react";
import styles from "./delete.module.css";
import { useNavigate } from "react-router-dom";
import { deleteCard } from "../../apis/card";
import { useDeleteCard } from "../../Context/DeleteCardContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Delete({ cardData, closeDeleteModal }) {
  console.log("card data is --------__>", cardData);
  const deleteCardFunc = async () => {
    try {
      const response = await deleteCard(cardData._id);
      toast.success(response, {
        autoClose: 1000,
      });
      closeDeleteModal();
    } catch (error) {
      closeDeleteModal();
      toast.error(error.message, {
        autoClose: 1000,
      });
    }
  };

  const test = () => {
    console.log("delete button clicked --------->");
  };

  return (
    <div className={styles.delete}>
      <div className={styles.box}>
        <p className={styles.message}>Are you sure you want to Delete?</p>
        <p className={styles.yes} onClick={deleteCardFunc}>
          Yes, Delete
        </p>
        <p className={styles.cancel} onClick={() => closeDeleteModal()}>
          Cancel
        </p>
      </div>
    </div>
  );
}

export default Delete;
