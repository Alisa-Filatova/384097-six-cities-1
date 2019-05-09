import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

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
];

describe(`App`, () => {
  it(`renders correctly`, () => {
    const app = renderer.create(
        <App
          rentalOffers={mock}
          onOfferTitleClick={jest.fn()}
        />
    ).toJSON();

    expect(app).toMatchSnapshot();
  });
});
