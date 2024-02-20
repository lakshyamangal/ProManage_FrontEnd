import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const registerUser = async ({ name, email, password }) => {
  try {
    const reqUrl = `${backendUrl}/auth/register`;
    const reqPayload = { name, email, password };
    const response = await axios.post(reqUrl, reqPayload);
    if (!response.data.success) throw new Error(response.data.data);
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const loginUser = async ({ email, password }) => {
  try {
    const reqUrl = `${backendUrl}/auth/login`;
    const reqPayload = { email, password };
    const response = await axios.post(reqUrl, reqPayload);

    if (!response.data.success) throw new Error(response.data.data);

    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
