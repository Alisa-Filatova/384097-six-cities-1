import * as React from 'react';
import {MemoryRouter as Router} from 'react-router-dom';
import * as renderer from 'react-test-renderer';
import FavoriteOffersGroup from './favorite-offers-group';
import {favoriteOffersGroupMock} from '../../mocks/favorite-offers-group';

describe(`FavoriteOffersGroup`, () => {
  it(`renders correctly`, () => {
    const group = renderer.create(
        <Router>
          <FavoriteOffersGroup
            offersGroup={favoriteOffersGroupMock as any}
            onFavoriteClick={jest.fn()}
            isAuthenticated={true}
          />
        </Router>
    ).toJSON();

    expect(group).toMatchSnapshot();
  });
});
