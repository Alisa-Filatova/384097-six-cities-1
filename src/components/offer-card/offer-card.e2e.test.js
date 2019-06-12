import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {mount, configure} from 'enzyme';
import OfferCard from './offer-card.jsx';

configure({adapter: new Adapter()});

const mock = {
  id: 123,
  title: `Nice place`,
  isPremium: true,
  price: 120,
  rating: 2.4,
  [`is_favorite`]: false,
  description: `asd asd`,
  type: `Apartment`,
  [`preview_image`]: `photo.jpg`,
  images: [``],
  goods: [``],
  bedrooms: 2,
  [`max_adults`]: 2,
  host: {},
  location: {
    latitude: 1288999,
    longitude: 87676689,
    zoom: 17,
  },
  city: {
    name: `Amsterdam`,
    location: {
      latitude: 1288999,
      longitude: 1288999,
      zoom: 13,
    },
  }
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
