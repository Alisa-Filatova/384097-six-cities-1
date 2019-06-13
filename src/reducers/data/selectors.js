import {createSelector} from 'reselect';
import {NameSpace} from '../namespaces';

const NAMESPACE = NameSpace.DATA;
const MAX_CITIES = 6;

const sortCitiesByName = (offers) => {
  const cities = offers.map((offer) => offer.city).sort((a, b) => {
    const textA = a.name.toUpperCase();
    const textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
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
