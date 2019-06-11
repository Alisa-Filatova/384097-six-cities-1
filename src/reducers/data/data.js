const initialState = {
  rentalOffers: [],
  currentCity: {},
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  CHANGE_CITY: `CHANGE_CITY`,
  RESET: `RESET`,
};

const ActionCreator = {
  loadOffers: (rentalOffers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: rentalOffers,
  }),
  changeCity: (currentCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: currentCity,
  }),
};

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
    .then((response) => {
      dispatch(ActionCreator.loadOffers(response.data));
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS: return Object.assign({}, state, {
      rentalOffers: action.payload,
    });

    case ActionType.CHANGE_CITY: return Object.assign({}, state, {
      currentCity: action.payload,
    });

    case ActionType.RESET: return Object.assign({}, initialState);
  }

  return state;
};

export {reducer, ActionCreator, ActionType, Operation};
