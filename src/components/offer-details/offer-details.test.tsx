import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {OfferDetails} from './offer-details';
import {offersMock} from '../../mocks/offers';
import {offerMock} from '../../mocks/offer';
import {Offer} from '../../types/offer';
import {reviewMock} from '../../mocks/review';
import {Review} from '../../types/user';

configure({adapter: new Adapter()});

describe(`OfferDetails`, () => {
  it(`renders correctly`, () => {
    const page = shallow(
        <OfferDetails
          nearOffers={offersMock as Offer[]}
          reviews={[reviewMock as Review]}
          offer={offerMock as Offer}
          onFavoriteClick={jest.fn()}
          isAuthenticated={true}
          getReviews={jest.fn()}
          saveReviewStatus={0}
          id={4}
        />
    );

    expect(shallowToJson(page)).toMatchSnapshot();
  });
});
