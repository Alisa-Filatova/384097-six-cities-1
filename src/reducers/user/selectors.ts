import NameSpace from '../namespaces';
import {keysToCamel} from '../../utils/snake-keys-to-camel';

const NAMESPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAMESPACE].isAuthenticated;
};

export const getUser = (state) => {
  return keysToCamel(state[NAMESPACE].user);
};

export const getPendingAuthStatus = (state) => {
  return state[NAMESPACE].pendingAuthorization;
};
