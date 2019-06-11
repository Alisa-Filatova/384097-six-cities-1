import {createSelector} from 'reselect';
import {NameSpace} from '../namespaces';

const NAMESPACE = NameSpace.DATA;
const MAX_CITIES = 6;

export const getOffers = (state) => {
  return state[NAMESPACE].rentalOffers;
};

export const getCurrentCity = (state) => {
  return state[NAMESPACE].currentCity;
};

// TODO
export const getCities = createSelector(
    [getOffers],
    (offers) => [...new Set(offers.map((offer) => offer.city.name))].slice(0, MAX_CITIES)
);

export const getCityOffers = createSelector(
    getOffers,
    getCurrentCity,
    (offers, city) => offers.filter((offer) => offer.city.name === city.name)
);
