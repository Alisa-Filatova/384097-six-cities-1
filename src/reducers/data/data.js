const initialState = {
  rentalOffers: [],
  currentCity: {},
  currentOffer: {},
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  CHANGE_CITY: `CHANGE_CITY`,
  SET_CURRENT_OFFER: `SET_CURRENT_OFFER`,
  POST_TO_FAVORITE: `POST_TO_FAVORITE`,
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

  changeOffer: (currentOffer) => ({
    type: ActionType.SET_CURRENT_OFFER,
    payload: currentOffer,
  }),

  postFavorite: (rentalOffers) => ({
    type: ActionType.POST_TO_FAVORITE,
    payload: rentalOffers,
  }),
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
    .then((response) => {
      dispatch(ActionCreator.loadOffers(response.data));
    });
  },
  postFavoriteOffer: (id, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${status}`)
    .then((response) => {
      dispatch(ActionCreator.postFavorite(response.data));
    })
    .catch((error) => {
      throw error;
    });
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

    case ActionType.SET_CURRENT_OFFER:
      return Object.assign({}, state, {
        currentOffer: action.payload,
      });
    case ActionType.POST_TO_FAVORITE:
      return Object.assign({}, state, {
        rentalOffers: action.payload,
      });
  }

  return state;
};

export {reducer, ActionCreator, ActionType, Operation};
