import React from "react";
import styles from "./delete.module.css";
import { useNavigate } from "react-router-dom";
import { deleteCard } from "../../apis/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Delete({ changeDelete }) {
  const navigate = useNavigate();
  const cardId = "65d30923c0caceeab2412084";
  const deleteCardFunc = async () => {
    try {
      const response = await deleteCard(cardId);
      changeDelete(false);
      toast.success(response, {
        autoClose: 1000,
      });
    } catch (error) {
      changeDelete(false);
      toast.error(error.message, {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className={styles.delete}>
      <div className={styles.box}>
        <p className={styles.message}>Are you sure you want to Delete?</p>
        <p className={styles.yes} onClick={deleteCardFunc}>
          Yes, Delete
        </p>
        <p className={styles.cancel} onClick={() => changeDelete(false)}>
          Cancel
        </p>
      </div>
    </div>
  );
}

export default Delete;
