import * as React from 'react';
import {MemoryRouter as Router} from 'react-router-dom';
import * as Adapter from 'enzyme-adapter-react-16';
import {mount, configure} from 'enzyme';
import OfferCard from './offer-card';
import {offerMock} from '../../mocks/offer';
import {Offer} from '../../types/offer';

configure({adapter: new Adapter()});

describe(`OfferCard`, () => {
  it(`get card offer id onImgClick handler`, () => {
    const onImgCallback = jest.fn(() => card.props().offer);

    const card = mount(
        <Router>
          <OfferCard
            offer={offerMock as Offer}
            onImgClick={onImgCallback}
            onFavoriteClick={jest.fn()}
            isAuthenticated={true}
          />
        </Router>
    );

    card.find(`.cities__image-wrapper > a`).simulate(`click`);
    expect(onImgCallback.mock.results[0].value).toBe(card.props().offer);
  });
});
