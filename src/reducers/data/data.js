const initialState = {
  rentalOffers: [],
  currentCity: {},
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  CHANGE_CITY: `CHANGE_CITY`,
  UPDATE_OFFER: `UPDATE_OFFER`,
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

  updateOffer: (offer) => ({
    type: ActionType.UPDATE_OFFER,
    payload: offer,
  }),
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
    .then((response) => {
      dispatch(ActionCreator.loadOffers(response.data));
    });
  },
  changeFavorites: (offer) => (dispatch, getState, api) => {
    const id = offer.id;
    const status = offer.is_favorite ? `0` : `1`;
    return api.post(`/favorite/${id}/${status}`)
      .then((response) => {
        dispatch(ActionCreator.updateOffer(response.data));
      })
      .catch(() => {});
  },

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {
        rentalOffers: action.payload,
      });

    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        currentCity: action.payload,
      });

    case ActionType.UPDATE_OFFER:
      return Object.assign({}, state, {
        rentalOffers: state.rentalOffers.map((offer) => {
          if (offer.id === action.payload.id) {
            return action.payload;
          }
          return offer;
        })
      });
  }

  return state;
};

export {reducer, ActionCreator, ActionType, Operation};
