const initialState = {
  isAuthorizationRequired: false,
  user: {},
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SIGN_IN: `SIGN_IN`,
};

const ActionCreator = ({
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),

  signIn: (user) => ({
    type: ActionType.SIGN_IN,
    payload: user,
  })
});

const Operation = {
  signIn: (data) => (dispatch, _getState, api) => {
    return api.post(`/login`, data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.requireAuthorization(true));
          dispatch(ActionCreator.signIn(response.data));
        }
      });
  },

  checkAuthorization: () => {
    return (dispatch, _getState, api) => {
      return api
        .get(`/login`)
        .then((res) => {
          if (res.status === 200) {
            dispatch(ActionCreator.requireAuthorization(false));
          }
        });
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
    case ActionType.SIGN_IN:
      return Object.assign({}, state, {
        user: action.payload,
      });
  }

  return state;
};

export {reducer, ActionCreator, Operation, ActionType};
