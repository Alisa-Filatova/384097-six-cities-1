import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainPage from './main-page.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`Card title should handle the click event`, () => {
  const cardTitleClickHandler = jest.fn();

  const page = shallow(
      <MainPage
        rentalOffers={[{title: `mockTitle`}]}
        onOfferTitleClick={cardTitleClickHandler}
      />
  );

  page.find(`.place-card__name > a`).simulate(`click`);

  expect(cardTitleClickHandler).toHaveBeenCalledTimes(1);
});
