import * as React from 'react';
import {MemoryRouter as Router} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import {mount, configure} from 'enzyme';
import OfferCard from './offer-card.jsx';

configure({adapter: new Adapter()});

const mock = {
  id: 1,
  city: {
    name: `Amsterdam`,
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    }
  },
  previewImage: `img/1.png`,
  images: [`img/1.png`, `img/2.png`],
  title: `Beautiful & luxurious studio at great location`,
  isFavorite: false,
  isPremium: false,
  rating: 4.8,
  type: `apartment`,
  bedrooms: 3,
  maxAdults: 4,
  price: 120,
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: {
    id: 3,
    isPro: true,
    name: `Angelina`,
    avatarUrl: `img/1.png`
  },
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8,
  }
};

describe(`OfferCard`, () => {
  it(`get card offer id onImgClick handler`, () => {
    const onImgCallback = jest.fn(() => card.props().offer);

    const card = mount(
        <Router>
          <OfferCard
            offer={mock}
            onImgClick={onImgCallback}
            onFavoriteClick={jest.fn()}
            isAuthenticated={true}
            history={{}}
          />
        </Router>
    );

    card.find(`.cities__image-wrapper > a`).simulate(`click`);
    expect(onImgCallback.mock.results[0].value).toBe(card.props().offer);
  });
});
