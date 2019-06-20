import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import {Operation, reducer, ActionCreator, ActionType} from './data';
import {ResponseStatus} from '../../enums/response-status';
import {SortType} from '../../types/sort-type';

describe(`Test API works correctly`, () => {
  it(`make a correct API call to /hotels`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const offersLoader = Operation.loadOffers();

    apiMock.onGet(`/hotels`)
      .reply(ResponseStatus.OK, []);

    return offersLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: [],
        });
      });
  });
});

describe(`Test ActionCreator reducer data`, () => {
  it(`set offersLoaded status`, () => {
    expect(ActionCreator.offersLoaded(true)).toEqual({
      payload: true,
      type: ActionType.OFFERS_LOADED,
    });
  });
  it(`set loadOffers`, () => {
    expect(ActionCreator.loadOffers([])).toEqual({
      payload: [],
      type: ActionType.LOAD_OFFERS,
    });
  });
  it(`set sortOffers`, () => {
    expect(ActionCreator.sortOffers(SortType.POPULAR)).toEqual({
      payload: SortType.POPULAR,
      type: ActionType.SORT_OFFERS,
    });
  });
  it(`set currentCity`, () => {
    expect(ActionCreator.changeCity({})).toEqual({
      payload: {},
      type: ActionType.CHANGE_CITY,
    });
  });
  it(`update offer`, () => {
    expect(ActionCreator.updateOffer({})).toEqual({
      payload: {},
      type: ActionType.UPDATE_OFFER,
    });
  });
});

describe(`Test reducer data`, () => {
  it(`get offersLoaded status`, () => {
    expect(reducer({offersLoaded: null}, {
      type: ActionType.OFFERS_LOADED,
      payload: true,
    })).toEqual({
      offersLoaded: true,
    });
  });
  it(`load offers`, () => {
    expect(reducer({rentalOffers: []}, {
      type: ActionType.LOAD_OFFERS,
      payload: [{}, {}, {}],
    })).toEqual({
      rentalOffers: [{}, {}, {}],
    });
  });
  it(`sorting offers`, () => {
    expect(reducer({sortValue: SortType.POPULAR}, {
      type: ActionType.SORT_OFFERS,
      payload: SortType.TOP_RATED,
    })).toEqual({
      sortValue: SortType.TOP_RATED,
    });
  });
  it(`change currentCity`, () => {
    expect(reducer({currentCity: {}}, {
      type: ActionType.CHANGE_CITY,
      payload: {name: `Amsterdam`},
    })).toEqual({
      currentCity: {name: `Amsterdam`},
    });
  });
  it(`update offer`, () => {
    expect(reducer({rentalOffers: [{name: `Amsterdam`, isFavorite: false}]}, {
      type: ActionType.UPDATE_OFFER,
      payload: {name: `Amsterdam`, isFavorite: true},
    })).toEqual({
      rentalOffers: [{name: `Amsterdam`, isFavorite: true}],
    });
  });

});

