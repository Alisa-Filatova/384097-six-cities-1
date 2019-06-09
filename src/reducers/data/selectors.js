import {createSelector} from 'reselect';
import {NameSpace} from '../namespaces';

const NAMESPACE = NameSpace.DATA;

export const getOffers = (state) => {
  return state[NAMESPACE].rentalOffers;
};

export const getCurrentCity = (state) => {
  return state[NAMESPACE].currentTown;
};

export const getCityOffers = createSelector(
    getOffers,
    getCurrentCity,
    (offers, city) => offers.filter((offer) => offer.city === city)
);
