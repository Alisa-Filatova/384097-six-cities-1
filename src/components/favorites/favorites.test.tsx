import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {Favorites} from './favorites';
import {favoriteOffersGroupMock} from '../../mocks/favorite-offers-group';

configure({adapter: new Adapter()});

describe('Favorites', () => {
  it('renders correctly', () => {
    const page = shallow(
        <Favorites
          offers={favoriteOffersGroupMock as any}
          isAuthenticated={true}
          onFavoriteClick={jest.fn()}
          loadFavoriteOffers={jest.fn()}
        />
    );

    expect(shallowToJson(page)).toMatchSnapshot();
  });
});
