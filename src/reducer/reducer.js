import rentalOffers from '../mocks/offers.js';

const MAX_TOWNS = 6;

const ActionType = {
  CHANGE_TOWN: `CHANGE_TOWN`,
  RESET: `RESET`,
};

const initialState = {
  currentTown: rentalOffers[0].town.name,
  rentalOffers,
  townsList: [...new Set(rentalOffers.map((offer) => offer.town.name))].slice(0, MAX_TOWNS),
};

const ActionCreator = {
  changeTown: (currentTown) => ({
    type: ActionType.CHANGE_TOWN,
    payload: currentTown,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_TOWN: return Object.assign({}, state, {
      currentTown: action.payload,
    });

    case ActionType.RESET: return Object.assign({}, initialState);
  }

  return state;
};

export {reducer, ActionCreator, ActionType, MAX_TOWNS};
