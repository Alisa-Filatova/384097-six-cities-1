const initialState = {
  rentalOffers: [],
  currentTown: ``,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  CHANGE_TOWN: `CHANGE_TOWN`,
  RESET: `RESET`,
};

const ActionCreator = {
  loadOffers: (rentalOffers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: rentalOffers,
  }),
  changeTown: (currentTown) => ({
    type: ActionType.CHANGE_TOWN,
    payload: currentTown,
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

    case ActionType.CHANGE_TOWN: return Object.assign({}, state, {
      currentTown: action.payload,
    });

    case ActionType.RESET: return Object.assign({}, initialState);
  }

  return state;
};

export {reducer, ActionCreator, ActionType, Operation};
