import * as React from 'react';
import {MemoryRouter as Router} from 'react-router-dom';
import * as renderer from 'react-test-renderer';
import OffersList from './offers-list';
import {offersMock} from '../../mocks/offers';
import {Offer} from '../../types/offer';

describe(`OffersList`, () => {
  it(`renders correctly`, () => {
    const list = renderer.create(
        <Router>
          <OffersList
            rentalOffers={offersMock as Offer[]}
            onImgClick={jest.fn()}
            onFavoriteClick={jest.fn()}
            isAuthenticated={true}
          />
        </Router>
    ).toJSON();

    expect(list).toMatchSnapshot();
  });
});
