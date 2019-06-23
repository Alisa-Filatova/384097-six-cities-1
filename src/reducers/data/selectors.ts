import {createSelector} from 'reselect';
import {keysToCamel} from '../../utils/snake-keys-to-camel';
import NameSpace from '../namespaces';
import SortType from '../../types/enums/sort-type';
import {MAX_CITIES} from '../../constants/constants';

const NAMESPACE = NameSpace.DATA;

const getUniqueCitiesFromOffers = (offers) => {
  const sortedCities = offers.map(({city}) => city).sort((cityA, cityB) => {
    const nameA = cityA.name.toLowerCase();
    const nameB = cityB.name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  });

  const uniqueCities = [];

  sortedCities.forEach((city, i, cities) => {
    if (i === 0 || city.name !== cities[i - 1].name) {
      uniqueCities.push(city);
    }
  });

  return uniqueCities;
};

export const groupFavoriteOffersByCity = (offers) => {
  const cities = {};

  offers.forEach((offer) => {
    const {name} = offer.city;

    if (!cities[name]) {
      cities[name] = [];
    }

    cities[name].push(offer);
  });

  return cities;
};

export const getOffers = (state) => {
  return keysToCamel(state[NAMESPACE].rentalOffers);
};

export const getFavoriteOffers = (state) => {
  return keysToCamel(state[NAMESPACE].favoriteOffers);
};

export const getFavoriteOffersGroupedByCity = createSelector(
    getFavoriteOffers,
    (favoriteOffers) => groupFavoriteOffersByCity(favoriteOffers),
);

export const getCurrentCity = (state) => {
  return state[NAMESPACE].currentCity;
};

export const getSortValue = (state) => {
  return state[NAMESPACE].sortValue;
};

export const getOffersLoadStatus = (state) => {
  return state[NAMESPACE].offersLoaded;
};

export const getCities = createSelector(
    [getOffers],
    (offers) => getUniqueCitiesFromOffers(offers).slice(0, MAX_CITIES)
);

export const getCityOffers = createSelector(
    getOffers,
    getCurrentCity,
    (offers, city) => offers.filter((offer) => offer.city.name === city.name)
);

export const getRandomOffer = createSelector(
    [getOffers],
    (offers) => {
      const min = 0;
      const max = offers.length;

      return offers[Math.floor(Math.random() * (max - min)) + min];
    }
);

export const sortOffers = createSelector(
    getCityOffers,
    getSortValue,
    (offers, state) => {
      switch (state) {
        case SortType.HIGH_TO_LOW:
          return offers.sort((a, b) => b.price - a.price);

        case SortType.LOW_TO_HIGH:
          return offers.sort((a, b) => a.price - b.price);

        case SortType.TOP_RATED:
          return offers.sort((a, b) => b.rating - a.rating);

        default:
          return offers.sort((a, b) => a.id - b.id);
      }
    }
);

export const getOfferById = (state, id) =>
  getOffers(state).filter((offer) => offer.id === +id)[0];

export const getCloserOffers = (state, id) => {
  const currentOffer = getOfferById(state, id);

  return getOffers(state).filter((offer) => (
    offer.city.name === currentOffer.city.name && offer.id !== +id
  ));
};
