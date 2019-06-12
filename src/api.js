import axios from 'axios';

const BASE_URL = `https://es31-server.appspot.com/six-cities`;
const STATUS_FORBIDDEN = 403;
const TIMEOUT = 5000;

export const createAPI = (onLoginFail) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (error) => {
    if (error.response.status === STATUS_FORBIDDEN) {
      onLoginFail();
    }

    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
