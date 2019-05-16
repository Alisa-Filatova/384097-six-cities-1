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
    coordinates: [52.3909553943508, 4.929309666406198],
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
    coordinates: [52.3909553943508, 4.929309666406198],
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
