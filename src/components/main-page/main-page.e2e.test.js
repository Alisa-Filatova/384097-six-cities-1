import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainPage from './main-page.jsx';

Enzyme.configure({adapter: new Adapter()});

const mock = [
  {
    title: `Beautiful & luxurious apartment at great location`,
    img: `img/apartment-01.jpg`,
    isPremium: true,
    price: 120,
    stars: 4,
    type: `Apartment`,
    isInBookmarks: false,
  },
];


it(`Card title should handle the click event`, () => {
  const cardTitleClickHandler = jest.fn();

  const page = mount(
      <MainPage
        rentalOffers={mock}
        onOfferTitleClick={cardTitleClickHandler}
      />
  );

  page.find(`.place-card__name > a`).simulate(`click`);

  expect(cardTitleClickHandler).toHaveBeenCalledTimes(1);
});
