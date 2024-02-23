import React, { createContext, useState, useContext } from "react";
const DeleteCardContext = createContext();
export const useDeleteCard = () => useContext(DeleteCardContext);
export const DeleteCardProvider = ({ children }) => {
  const [delCardId, setDelCardId] = useState(null);
  const updateDelCardId = (cardId) => {
    setDelCardId(cardId);
  };

  return (
    <DeleteCardContext.Provider value={{ delCardId, updateDelCardId }}>
      {children}
    </DeleteCardContext.Provider>
  );
};
