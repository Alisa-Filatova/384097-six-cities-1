import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {mount, configure} from 'enzyme';
import OfferCard from './offer-card.jsx';

configure({adapter: new Adapter()});

const mock = {
  id: 123,
  title: `Beautiful & luxurious apartment at great location`,
  preview_image: `img/apartment-01.jpg`,
  isPremium: true,
  price: 120,
  rating: 4,
  type: `Apartment`,
  isInBookmarks: false,
  coordinates: [52.3909553943508, 4.929309666406198],
};

describe(`OfferCard`, () => {
  it(`get card offer id on OfferImgClick handler`, () => {
    const onClickTitleHandler = jest.fn();
    const mouseOverHandler = jest.fn();
    const mouseOutHandler = jest.fn();
    const onOfferImgCallback = jest.fn(() => card.props().offer.id);

    const card = mount(
        <OfferCard
          activeItem={1}
          offer={mock}
          onOfferTitleClick={onClickTitleHandler}
          onOfferImgClick={onOfferImgCallback}
          onMouseOver={mouseOverHandler}
          onMouseOut={mouseOutHandler}
        />
    );

    card.find(`.cities__image-wrapper > a`).simulate(`click`);
    expect(onOfferImgCallback.mock.results[0].value).toBe(card.props().offer.id);
  });
});
