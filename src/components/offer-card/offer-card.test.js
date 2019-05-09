import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from './offer-card.jsx';

const mock = {
  title: `Beautiful & luxurious apartment at great location`,
  img: `img/apartment-01.jpg`,
  isPremium: true,
  price: 120,
  stars: 4,
  type: `Apartment`,
  isInBookmarks: false,
};

describe(`OfferCard`, () => {
  it(`renders correctly`, () => {
    const onClickHandler = jest.fn();
    const mouseOverHandler = jest.fn();
    const mouseLeaveHandler = jest.fn();

    const card = renderer.create(
        <OfferCard
          offer={mock}
          onTitleClick={onClickHandler}
          onMouseOver={mouseOverHandler}
          onMouseOut={mouseLeaveHandler}
        />
    ).toJSON();

    expect(card).toMatchSnapshot();
  });
});
