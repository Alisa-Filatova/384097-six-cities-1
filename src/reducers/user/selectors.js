import {NameSpace} from '../namespaces';

const NAMESPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAMESPACE].isAuthorizationRequired;
};

export const getUser = (state) => {
  return state[NAMESPACE].user;
};
