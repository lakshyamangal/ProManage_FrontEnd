import React, { createContext, useState, useContext } from "react";

// Create a new context
const FetchDataContext = createContext();

// Create a custom hook to access the context
export const useDeleteUser = () => useContext(DeleteUserContext);

// Create a provider component
export const DeleteUserProvider = ({ children }) => {
  const [userToDelete, setUserToDelete] = useState(null);

  const deleteUser = (userId) => {
    setUserToDelete(userId);
  };

  const cancelDelete = () => {
    setUserToDelete(null);
  };

  return (
    <DeleteUserContext.Provider
      value={{ userToDelete, deleteUser, cancelDelete }}
    >
      {children}
    </DeleteUserContext.Provider>
  );
};
