import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {MainPage} from './main-page.jsx';

configure({adapter: new Adapter()});

const mock = [
  {
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
  }
];

describe(`MainPage`, () => {
  it(`renders correctly`, () => {
    const page = shallow(
        <MainPage
          cityOffers={mock}
          currentCity={mock[0].city}
          onCityClick={jest.fn()}
          cities={mock}
          offersLoaded={false}
          onPopularClick={jest.fn()}
          onLowToHighClick={jest.fn()}
          onHighToLowClick={jest.fn()}
          onTopRatedClick={jest.fn()}
          sortValue={`Popular`}
          history={{}}
        />
    );

    expect(shallowToJson(page)).toMatchSnapshot();
  });
});
