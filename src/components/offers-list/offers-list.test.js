import React from 'react';
import renderer from 'react-test-renderer';
import OffersList from './offers-list.jsx';

const mock = [
  {
    id: 123,
    title: `Beautiful & luxurious apartment at great location`,
    img: `img/apartment-01.jpg`,
    isPremium: true,
    price: 120,
    stars: 4,
    type: `Apartment`,
    isInBookmarks: false,
  },
  {
    id: 123,
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
        <OffersList rentalOffers={mock} />
    ).toJSON();

    expect(list).toMatchSnapshot();
  });
});
