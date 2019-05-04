import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';

describe(`MainPage`, () => {
  it(`renders correctly`, () => {
    const page = renderer.create(
        <MainPage
          rentalOffers={[{title: `mockTitle`}]}
          onOfferTitleClick={jest.fn()}
        />
    ).toJSON();

    expect(page).toMatchSnapshot();
  });
});
