import React, { createContext, useState, useContext } from "react";
import { deleteCard } from "../apis/card";
const EditCardContext = createContext();
export const useEditCard = () => useContext(EditCardContext);
export const EditCardProvider = ({ children }) => {
  const [cardId, setCardId] = useState(null);
  const [key, setKey] = useState(null);
  const updateCardId = (cardId) => {
    setCardId(cardId);
  };
  const updateKey = (val) => {
    setKey(val);
  };
  // const [showDelete, setShowDelete] = useState(false);
  // const updateShowDelete = (status) => {
  // setShowDelete(status);
  // };

  return (
    <EditCardContext.Provider value={{ cardId, updateCardId, key, updateKey }}>
      {children}
    </EditCardContext.Provider>
  );
};
