const initialState = {
  isAuthenticated: false,
  pendingAuthorization: true,
  user: {},
};

export interface ActionType {
  type: UserAction,
  payload: any,
}

enum UserAction {
  PENDING_AUTHORIZATION = 'PENDING_AUTHORIZATION',
  AUTHORIZATION_STATUS = 'AUTHORIZATION_STATUS',
  LOGIN = 'LOGIN',
}

const ActionCreator = ({
  pendingAuthorization: (status: boolean) => ({
    type: UserAction.PENDING_AUTHORIZATION,
    payload: status,
  }),

  /**
   * @param {Boolean} status - true, если пользователь авторизованы
   * @return {Object}
   */
  setAuthorizationStatus: (status: boolean) => ({
    type: UserAction.AUTHORIZATION_STATUS,
    payload: status,
  }),

  login: (user) => ({
    type: UserAction.LOGIN,
    payload: user,
  })
});

const Operation = {
  login: (data) => (dispatch, getState, api) => {
    dispatch(ActionCreator.pendingAuthorization(true));

    return api.post(`/login`, data)
      .then((response) => {
        dispatch(ActionCreator.login(response.data));
        dispatch(ActionCreator.setAuthorizationStatus(true));
      })
      .catch(() => {
        dispatch(ActionCreator.setAuthorizationStatus(false));
      })
      .finally(() => {
        dispatch(ActionCreator.pendingAuthorization(false));
      });
  },

  checkAuthorization: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.pendingAuthorization(true));

    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.login(response.data));
        dispatch(ActionCreator.setAuthorizationStatus(true));
      })
      .catch(() => {
        dispatch(ActionCreator.setAuthorizationStatus(false));
      })
      .finally(() => {
        dispatch(ActionCreator.pendingAuthorization(false));
      });
  }
};

const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case UserAction.AUTHORIZATION_STATUS:
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    case UserAction.LOGIN:
      return {
        ...state,
        user: action.payload,
      };

    case UserAction.PENDING_AUTHORIZATION:
      return {
        ...state,
        pendingAuthorization: action.payload,
      };

    default:
      return state;
  }
};

export {reducer, ActionCreator, Operation, UserAction, initialState};
