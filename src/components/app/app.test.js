import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

describe(`App`, () => {
  it(`renders correctly`, () => {
    const app = renderer.create(
        <App
          rentalOffers={[{title: `mockTitle`}]}
          onOfferTitleClick={jest.fn()}
        />
    ).toJSON();

    expect(app).toMatchSnapshot();
  });
});
