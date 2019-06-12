import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map.jsx';

const mock = [
  {
    id: 123,
    title: `Beautiful & luxurious apartment at great location`,
    [`preview_image`]: `img/apartment-01.jpg`,
    isPremium: true,
    price: 120,
    rating: 4,
    type: `Apartment`,
    isInBookmarks: false,
    coordinates: [52.369553943508, 4.85309666406198],
    city: {
      name: `Amsterdam`,
      coordinates: [52.38333, 4.9],
    },
  },
  {
    id: 123,
    title: `Beautiful & luxurious apartment at great location`,
    [`preview_image`]: `img/apartment-01.jpg`,
    isPremium: true,
    price: 120,
    rating: 4,
    type: `Apartment`,
    isInBookmarks: false,
    coordinates: [52.3909553943508, 4.85309666406198],
    city: {
      name: `Amsterdam`,
      coordinates: [52.38333, 4.9],
    },
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
        <Map cityOffers={mock} currentTown={{location: 123}} />
    ).toJSON();

    expect(map).toMatchSnapshot();
  });
});
