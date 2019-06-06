const MAX_TOWNS = 6;

const ActionType = {
  CHANGE_TOWN: `CHANGE_TOWN`,
  RESET: `RESET`,
  LOAD_OFFERS: `LOAD_OFFERS`,
};

const initialState = {
  currentTown: `Amsterdam`,
  rentalOffers: [],
};

const ActionCreator = {
  changeTown: (currentTown) => ({
    type: ActionType.CHANGE_TOWN,
    payload: currentTown,
  }),
  loadOffers: (offers) => ({
    type: ActionType.CHANGE_TOWN,
    payload: offers,
  }),
};

const loadOffers = () => (dispatch) => {
  return fetch(`https://es31-server.appspot.com/six-cities`)
    .then((response) => response.json())
    .then((offers) => {
      dispatch.ActionCreator.loadOffers(offers);
    });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_TOWN: return Object.assign({}, state, {
      currentTown: action.payload,
    });

    case ActionType.LOAD_OFFERS: return Object.assign({}, state, {
      rentalOffers: action.payload,
    });

    case ActionType.RESET: return Object.assign({}, initialState);
  }

  return state;
};

export {reducer, ActionCreator, ActionType, MAX_TOWNS, loadOffers};
