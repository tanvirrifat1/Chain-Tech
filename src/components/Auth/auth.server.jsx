import { authKey } from "../Shared/Token";
import { getFromLocalStorage, setToLocalStorage } from "./Local.Storage";
import { decodedToken } from "./jwt";

export const storeUserInfo = ({ accessToken }) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const getToken = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return authToken;
  } else {
    return "";
  }
};

export const isLogin = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};

export const removeUserInfo = (key) => {
  return localStorage.removeItem(key);
};
