import SortType from '../../types/enums/sort-type';
import {keysToCamel} from '../../utils/snake-keys-to-camel';

const initialState = {
  rentalOffers: [],
  currentCity: {},
  favoriteOffers: [],
  offersLoaded: false,
  sortValue: SortType.POPULAR,
};

interface ActionType {
  type: DataAction,
  payload: any,
}

enum DataAction {
  OFFERS_LOADED = 'OFFERS_LOADED',
  LOAD_OFFERS = 'LOAD_OFFERS',
  LOAD_FAVORITE_OFFERS = 'LOAD_FAVORITE_OFFERS',
  CHANGE_CITY = 'CHANGE_CITY',
  SORT_OFFERS = 'SORT_OFFERS',
  ADD_FAVORITE_OFFER = 'ADD_FAVORITE_OFFER',
  REMOVE_FAVORITE_OFFER = 'REMOVE_FAVORITE_OFFER',
}

const ActionCreator = {
  offersLoaded: (status) => ({
    type: DataAction.OFFERS_LOADED,
    payload: status,
  }),

  loadOffers: (rentalOffers) => ({
    type: DataAction.LOAD_OFFERS,
    payload: rentalOffers,
  }),

  loadFavoriteOffers: (favoriteOffers) => ({
    type: DataAction.LOAD_FAVORITE_OFFERS,
    payload: favoriteOffers,
  }),

  changeCity: (currentCity) => ({
    type: DataAction.CHANGE_CITY,
    payload: currentCity,
  }),

  addFavoriteOffer: (offer) => ({
    type: DataAction.ADD_FAVORITE_OFFER,
    payload: offer,
  }),

  removeFavoriteOffer: (offer) => ({
    type: DataAction.REMOVE_FAVORITE_OFFER,
    payload: offer,
  }),

  sortOffers: (sortValue) => ({
    type: DataAction.SORT_OFFERS,
    payload: sortValue,
  }),
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data));
        dispatch(ActionCreator.offersLoaded(true));
      })
      .catch(() => {});
  },

  loadFavoriteOffers: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavoriteOffers(response.data));
      })
      .catch(() => {});
  },

  toggleFavorite: (offer) => (dispatch, getState, api) => {
    const {id} = offer;
    const status = offer.isFavorite ? `0` : `1`;

    return api.post(`/favorite/${id}/${status}`)
      .then((response) => {
        const updatedOffer = keysToCamel(response.data);

        if (updatedOffer.isFavorite) {
          dispatch(ActionCreator.addFavoriteOffer(updatedOffer));
        } else {
          dispatch(ActionCreator.removeFavoriteOffer(updatedOffer));
        }
      })
      .catch(() => {});
  },
};

const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case DataAction.LOAD_OFFERS:
      return {
        ...state,
        rentalOffers: action.payload,
      };

    case DataAction.LOAD_FAVORITE_OFFERS:
      return {
        ...state,
        favoriteOffers: action.payload,
      };

    case DataAction.CHANGE_CITY:
      return {
        ...state,
        currentCity: action.payload,
      };

    case DataAction.OFFERS_LOADED:
      return {
        ...state,
        offersLoaded: action.payload,
      };

    case DataAction.SORT_OFFERS:
      return {
        ...state,
        sortValue: action.payload,
      };

    case DataAction.ADD_FAVORITE_OFFER:
      return {
        ...state,
        rentalOffers: state.rentalOffers.map((offer) => (
          offer.id === action.payload.id ? action.payload : offer
        )),
        favoriteOffers: [
          ...state.favoriteOffers,
          action.payload,
        ],
      };

    case DataAction.REMOVE_FAVORITE_OFFER:
      return {
        ...state,
        rentalOffers: state.rentalOffers.map((offer) => (
          offer.id === action.payload.id ? action.payload : offer
        )),
        favoriteOffers: state.favoriteOffers.filter((offer) => (
          offer.id !== action.payload.id
        )),
      };

    default:
      return state;
  }
};

export {reducer, ActionCreator, Operation, initialState, DataAction};
