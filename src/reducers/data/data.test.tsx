import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import {Operation, reducer, ActionCreator, DataAction, initialState} from './data';
import ResponseStatus from '../../types/enums/response-status';
import SortType from '../../types/enums/sort-type';
import {offerMock} from '../../mocks/offer';
import {offersMock} from '../../mocks/offers';
import {cityMock} from '../../mocks/city';

describe(`Test API works correctly`, () => {
  it(`make a correct API call to /hotels`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch, jest.fn());
    const apiMock = new MockAdapter(api);
    const offersLoader = Operation.loadOffers();

    apiMock.onGet(`/hotels`)
      .reply(ResponseStatus.OK, []);

    return offersLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataAction.LOAD_OFFERS,
          payload: [],
        });
      });
  });

  it(`make a correct API call to /favorite`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch, jest.fn());
    const apiMock = new MockAdapter(api);
    const favoriteOffersLoader = Operation.loadFavoriteOffers();

    apiMock.onGet(`/favorite`)
      .reply(ResponseStatus.OK, offersMock);

    return favoriteOffersLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataAction.LOAD_FAVORITE_OFFERS,
          payload: offersMock,
        });
      });
  });

  it(`make a correct post to /favorite/:id/:status`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch, dispatch);
    const apiMock = new MockAdapter(api);
    const toggleFavorite = Operation.toggleFavorite(offerMock);

    apiMock.onPost(`/favorite/1/1`)
      .reply(ResponseStatus.OK, offerMock);

    return toggleFavorite(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataAction.REMOVE_FAVORITE_OFFER,
          payload: offerMock,
        });
      });
  });
});

describe(`Test ActionCreator reducer data`, () => {
  it(`set offersLoaded status`, () => {
    expect(ActionCreator.offersLoaded(true)).toEqual({
      payload: true,
      type: DataAction.OFFERS_LOADED,
    });
  });

  it(`set loadOffers`, () => {
    expect(ActionCreator.loadOffers(offerMock)).toEqual({
      payload: offerMock,
      type: DataAction.LOAD_OFFERS,
    });
  });

  it(`set favoriteOffers`, () => {
    expect(ActionCreator.loadFavoriteOffers(offerMock)).toEqual({
      payload: offerMock,
      type: DataAction.LOAD_FAVORITE_OFFERS,
    });
  });

  it(`set sortOffers`, () => {
    expect(ActionCreator.sortOffers(SortType.POPULAR)).toEqual({
      payload: SortType.POPULAR,
      type: DataAction.SORT_OFFERS,
    });
  });

  it(`set currentCity`, () => {
    expect(ActionCreator.changeCity(cityMock)).toEqual({
      payload: cityMock,
      type: DataAction.CHANGE_CITY,
    });
  });

  it(`add favorite offer`, () => {
    expect(ActionCreator.addFavoriteOffer(offerMock)).toEqual({
      payload: offerMock,
      type: DataAction.ADD_FAVORITE_OFFER,
    });
  });

  it(`remove favorite offer`, () => {
    expect(ActionCreator.removeFavoriteOffer(offerMock)).toEqual({
      payload: offerMock,
      type: DataAction.REMOVE_FAVORITE_OFFER,
    });
  });
});

describe(`Test reducer data`, () => {
  it(`get offersLoaded status`, () => {
    expect(reducer({...initialState}, {
      type: DataAction.OFFERS_LOADED,
      payload: true,
    })).toEqual({
      currentCity: {},
      offersLoaded: true,
      favoriteOffers: [],
      rentalOffers: [],
      sortValue: SortType.POPULAR,
    });
  });

  it(`load offers`, () => {
    expect(reducer({...initialState}, {
      type: DataAction.LOAD_OFFERS,
      payload: offersMock,
    })).toEqual({
      currentCity: {},
      offersLoaded: false,
      favoriteOffers: [],
      rentalOffers: offersMock,
      sortValue: SortType.POPULAR,
    });
  });

  it(`load favorite offers`, () => {
    expect(reducer({...initialState}, {
      type: DataAction.LOAD_FAVORITE_OFFERS,
      payload: offersMock,
    })).toEqual({
      currentCity: {},
      offersLoaded: false,
      rentalOffers: [],
      favoriteOffers: offersMock,
      sortValue: SortType.POPULAR,
    });
  });

  it(`sorting offers`, () => {
    expect(reducer({...initialState}, {
      type: DataAction.SORT_OFFERS,
      payload: SortType.TOP_RATED,
    })).toEqual({
      currentCity: {},
      offersLoaded: false,
      favoriteOffers: [],
      rentalOffers: [],
      sortValue: SortType.TOP_RATED,
    });
  });

  it(`change currentCity`, () => {
    expect(reducer({...initialState}, {
      type: DataAction.CHANGE_CITY,
      payload: cityMock,
    })).toEqual({
      currentCity: cityMock,
      offersLoaded: false,
      favoriteOffers: [],
      rentalOffers: [],
      sortValue: SortType.POPULAR,
    });
  });

  it(`add favorite offer`, () => {
    expect(reducer({...initialState}, {
      type: DataAction.ADD_FAVORITE_OFFER,
      payload: offerMock,
    })).toEqual({
      currentCity: {},
      offersLoaded: false,
      favoriteOffers: [offerMock],
      rentalOffers: [],
      sortValue: SortType.POPULAR,
    });
  });

  it(`remove favorite offer`, () => {
    expect(reducer({...initialState}, {
      type: DataAction.REMOVE_FAVORITE_OFFER,
      payload: offerMock,
    })).toEqual({
      currentCity: {},
      offersLoaded: false,
      favoriteOffers: [],
      rentalOffers: [],
      sortValue: SortType.POPULAR,
    });
  });
});

