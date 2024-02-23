import React, { createContext, useState, useContext } from "react";
import { deleteCard } from "../apis/card";
const DeleteCardContext = createContext();
export const useDeleteCard = () => useContext(DeleteCardContext);
export const DeleteCardProvider = ({ children }) => {
  const [cardId, setCardId] = useState(null);
  const updateCardId = (cardId) => {
    setCardId(cardId);
  };
  const [showDelete, setShowDelete] = useState(false);
  const updateShowDelete = (status) => {
    setShowDelete(status);
  };

  return (
    <DeleteCardContext.Provider
      value={{ cardId, updateCardId, showDelete, updateShowDelete }}
    >
      {children}
    </DeleteCardContext.Provider>
  );
};
