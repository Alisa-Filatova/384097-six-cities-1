import api from '../api.js';

const MAX_TOWNS = 6;

const ActionType = {
  CHANGE_TOWN: `CHANGE_TOWN`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  RESET: `RESET`,
};

const initialState = {
  currentTown: `Cologne`,
  rentalOffers: [],
  townsList: [],
};

const ActionCreator = {
  changeTown: (currentTown) => ({
    type: ActionType.CHANGE_TOWN,
    payload: currentTown,
  }),
  loadOffers: (rentalOffers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: rentalOffers,
  }),
};

const Operation = {
  loadOffers: () => (dispatch) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data));
      });
  }
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

export {reducer, ActionCreator, ActionType, MAX_TOWNS, Operation};
