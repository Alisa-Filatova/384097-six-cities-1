import React from 'react';
import renderer from 'react-test-renderer';
import OffersList from './offers-list.jsx';

const mock = [
  {
    title: `Beautiful & luxurious apartment at great location`,
    img: `img/apartment-01.jpg`,
    isPremium: true,
    price: 120,
    stars: 4,
    type: `Apartment`,
    isInBookmarks: false,
  },
  {
    title: `Beautiful & luxurious apartment at great location`,
    img: `img/apartment-01.jpg`,
    isPremium: true,
    price: 120,
    stars: 4,
    type: `Apartment`,
    isInBookmarks: false,
  }
];

describe(`OffersList`, () => {
  it(`renders correctly`, () => {
    const list = renderer.create(
        <OffersList
          rentalOffers={mock}
          onOfferTitleClick={jest.fn()}
        />
    ).toJSON();

    expect(list).toMatchSnapshot();
  });
});
