import {createSelector} from 'reselect';
import {NameSpace} from '../namespaces';

const NAMESPACE = NameSpace.DATA;
const MAX_CITIES = 6;

const sortCitiesByName = (offers) => {
  const cities = offers.map((offer) => offer.city).sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  });

  return cities.reduce((prev, current) => {
    if (!prev.includes(current)) {
      prev.push(current);
    }
    return prev;
  }, []);
};

const getUnicCities = (arr) => {
  const unicCities = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === 0 || arr[i].name !== arr[i - 1].name) {
      unicCities.push(arr[i]);
    }
  }

  return unicCities;
};

const getRandomCityOffer = (offers) => {
  const min = 0;
  const max = Math.floor(offers.length);
  return offers[Math.floor(Math.random() * (max - min)) + min];
};

export const getOffers = (state) => {
  return state[NAMESPACE].rentalOffers;
};

export const getCurrentCity = (state) => {
  return state[NAMESPACE].currentCity;
};

export const getCurrentOffer = (state) => {
  return state[NAMESPACE].currentOffer;
};

export const getCities = createSelector(
    [getOffers],
    (offers) => getUnicCities(sortCitiesByName(offers)).slice(0, MAX_CITIES)
);

export const getCityOffers = createSelector(
    getOffers,
    getCurrentCity,
    (offers, city) => offers.filter((offer) => offer.city.name === city.name)
);

export const getRandomOffer = createSelector(
    [getOffers],
    (state) => getRandomCityOffer(state)
);

export const sortOffersByLowToHigh = (offers) =>
  offers.sort((a, b) => a.price - b.price);

export const sortOffersByHighToLow = (offers) =>
  offers.sort((a, b) => b.price - a.price);

export const sortOffersByRating = (offers) =>
  offers.sort((a, b) => b.rating - a.rating);

export const sortOffersById = (offers) =>
  offers.sort((a, b) => a.id - b.id);

export const getOfferById = (state, id) =>
  getOffers(state).filter((item) => item.id === +id)[0];

export const getCloserOffers = (state, id) => {
  const offer = getOfferById(state, id);

  return getOffers(state)
  .filter((item) => item.city.name === offer.city.name)
  .filter((item) => item.id !== +id);
};

export const getFavoriteOffers = (state) =>
  getOffers(state).filter((item) => item.is_favorite);
