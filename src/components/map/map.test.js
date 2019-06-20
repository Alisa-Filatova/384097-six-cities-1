import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map.jsx';

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

describe(`Map`, () => {
  it(`renders correctly`, () => {
    // leaflet в вызове map вызывает document.getElementById,
    // но так как тесты выполняются в тестовом окружении и в ноде, то ему jsdom возвращает null.
    // Чтобы пофиксить - создаем окружение с помощью jsdom - так мы подстраиваемся
    // под реализацию сторонней библиотеки (избегаем падения теста).
    const mapContainer = global.document.createElement(`mapContainer`);
    mapContainer.setAttribute(`id`, `map`);
    global.document.body.appendChild(mapContainer);

    const map = renderer.create(
        <Map
          cityOffers={mock}
          currentCity={mock[0].city}
          activeOfferId={1}
          zoom={false}
        />
    ).toJSON();

    expect(map).toMatchSnapshot();
  });
});
