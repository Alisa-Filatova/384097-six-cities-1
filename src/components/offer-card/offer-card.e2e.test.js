import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import OfferCard from './offer-card.jsx';

configure({adapter: new Adapter()});

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
  it(`renders correctly after handles events`, () => {
    const onClickHandler = jest.fn();
    const mouseOverHandler = jest.fn();
    const mouseOutHandler = jest.fn();

    const card = shallow(
        <OfferCard
          offer={mock}
          onTitleClick={onClickHandler}
          onMouseOver={mouseOverHandler}
          onMouseOut={mouseOutHandler}
        />
    );

    card.find(`.place-card__name > a`).simulate(`click`);
    expect(onClickHandler).toHaveBeenCalledTimes(1);

    const offerCard = card.find(`.cities__place-card`);

    offerCard.simulate(`mouseover`);
    expect(mouseOverHandler).toHaveBeenCalledTimes(1);

    offerCard.simulate(`mouseout`);
    expect(mouseOutHandler).toHaveBeenCalledTimes(1);
  });
});
