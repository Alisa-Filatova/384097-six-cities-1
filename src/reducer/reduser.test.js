import {ActionType, reducer, MAX_TOWNS, ActionCreator} from './reducer';
import rentalOffers from '../mocks/offers';

const DEFAULT_TOWN = `Amsterdam`;

describe(`Reducer works correct`, () => {

  const townsList = [...new Set(rentalOffers.map((offer) => offer.town.name))].slice(0, MAX_TOWNS);

  it(`without params it return initialState`, () => {
    expect(reducer(undefined, {})).toEqual({
      currentTown: rentalOffers[0].town.name,
      rentalOffers,
      townsList,
    });
  });

  it(`changed currentTown to new value`, () => {
    expect(reducer(
        {currentTown: `Paris`},
        {
          type: ActionType.CHANGE_TOWN,
          payload: DEFAULT_TOWN,
        })
    ).toEqual({
      currentTown: DEFAULT_TOWN,
    });
  });

  it(`correctly reset app state`, () => {
    expect(reducer(
        {
          currentTown: ``,
          rentalOffers: [],
          townsList: [DEFAULT_TOWN],
        },
        {
          type: ActionType.RESET,
        })
    ).toEqual({
      currentTown: rentalOffers[0].town.name,
      rentalOffers,
      townsList,
    });
  });
});

describe(`ActionCreator`, () => {
  it(`changeTown returned correctly Action`, () => {
    expect(ActionCreator.changeTown(DEFAULT_TOWN))
    .toEqual({
      type: ActionType.CHANGE_TOWN,
      payload: DEFAULT_TOWN,
    });
  });
});
