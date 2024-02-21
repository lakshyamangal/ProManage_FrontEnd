import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getAllCards = async (duration) => {
  try {
    const reqUrl = `${backendUrl}/card/getAllCards/${duration}`;
    console.log(reqUrl);
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(reqUrl);
    console.log(response.data.data);
    if (!response.data.success) throw new Error(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
export const statusChange = async (cardId, status) => {
  try {
    const reqUrl = `${backendUrl}/card/changeStatus`;
    const reqPayload = { cardId, status };
    console.log("request payload ", reqPayload);
    const response = await axios.put(reqUrl, reqPayload);
    if (!response.data.success) throw new Error(response.data.data);
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const editCheckList = async (cardId, checkListId, isCompleted) => {
  try {
    const reqUrl = `${backendUrl}/card/editCheckList`;
    const reqPayload = { cardId, checkListId, isCompleted };
    console.log("request payload ", reqPayload);
    const response = await axios.put(reqUrl, reqPayload);
    if (!response.data.success) throw new Error(response.data.data);
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const deleteCard = async ({ cardId }) => {
  try {
    const reqUrl = `${backendUrl}/card/deleteCard/${cardId}`;
    const response = await axios.delete(reqUrl);
    if (!response.data.success) throw new Error(response.data.data);
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
