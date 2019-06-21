import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import OfferCard from './offer-card';
import {Offer} from '../../types/offer';
import {offerMock} from '../../mocks/offer';

configure({adapter: new Adapter()});

describe(`OfferCard`, () => {
  it(`renders correctly`, () => {
    const card = shallow(
        <OfferCard
          offer={offerMock as Offer}
          onImgClick={jest.fn()}
          onFavoriteClick={jest.fn()}
          isAuthenticated={true}
        />
    );

    expect(shallowToJson(card)).toMatchSnapshot();
  });
});
