import axios from 'axios';
import {BASE_URL} from './constants/constants';
import {ResponseStatus} from './types/enums/response-status';

const TIMEOUT = 5000;

export const createAPI = (onLoginFail, onServerError) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (error) => {
    if (error.response && error.response.status === ResponseStatus.FORBIDDEN) {
      onLoginFail();
    } else if (error.response && error.response.status >= ResponseStatus.INTERNAL_SERVER_ERROR
      && error.response.status < ResponseStatus.INVALID_REQUEST) {
      onServerError();
    }
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
