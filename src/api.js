import axios from 'axios';
import {ActionCreator} from './reducers/user/user';

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (error) => {
    if (error.response.status === 403) {
      dispatch(ActionCreator.requireAuthorization(true));
    }
    return error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
