import React, { createContext, useState, useContext } from "react";
import { getAllCards } from "../apis/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DataContext = createContext();
export const useData = () => useContext(DataContext);
export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [keys, setKeys] = useState([]);
  const fetchAllData = async (duration) => {
    try {
      const data = await getAllCards(duration);
      setData(data);
      setKeys(Object.keys(data));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <DataContext.Provider value={{ data, keys, fetchAllData }}>
      {children}
    </DataContext.Provider>
  );
};
