import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {MainPage} from './main-page';
import {offerMock} from '../../mocks/offer';
import {offersMock} from '../../mocks/offers';
import {Offer, City} from '../../types/offer';
import {cityMock} from '../../mocks/city';
import SortType from '../../types/enums/sort-type';

configure({adapter: new Adapter()});

describe(`MainPage`, () => {
  it(`renders correctly`, () => {
    const page = shallow(
        <MainPage
          activeOfferId={1}
          offer={offerMock as Offer}
          cities={[cityMock as City]}
          cityOffers={offersMock as Offer[]}
          currentCity={cityMock as City}
          onCityClick={jest.fn()}
          offersLoaded={false}
          onPopularClick={jest.fn()}
          onLowToHighClick={jest.fn()}
          onHighToLowClick={jest.fn()}
          onTopRatedClick={jest.fn()}
          onFavoriteClick={jest.fn()}
          sortValue={SortType.POPULAR}
          isAuthenticated={true}
        />
    );

    expect(shallowToJson(page)).toMatchSnapshot();
  });
});
