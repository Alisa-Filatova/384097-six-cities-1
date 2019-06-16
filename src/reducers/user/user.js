const initialState = {
  isAuthorizationRequired: false,
  user: {},
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOGIN: `LOGIN`,
};

const ActionCreator = ({
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),

  login: (user) => ({
    type: ActionType.LOGIN,
    payload: user,
  })
});

const Operation = {
  login: (data) => (dispatch, getState, api) => {
    return api.post(`/login`, data)
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.login(response.data));
          dispatch(ActionCreator.requireAuthorization(true));
        }
      })
      .catch(() => {});
  },

  checkAuthorization: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.login(response.data));
          dispatch(ActionCreator.requireAuthorization(true));
        }
      })
      .catch(() => {});
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
    case ActionType.LOGIN:
      return Object.assign({}, state, {
        user: action.payload,
      });
  }

  return state;
};

export {reducer, ActionCreator, Operation, ActionType};
