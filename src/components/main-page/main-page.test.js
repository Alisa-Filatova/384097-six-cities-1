import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';

const mock = [
  {
    id: 123,
    title: `Beautiful & luxurious apartment at great location`,
    img: `img/apartment-01.jpg`,
    isPremium: true,
    price: 120,
    stars: 4,
    type: `Apartment`,
    isInBookmarks: false,
    coordinates: [52.3909553943508, 4.929309666406198],
  },
  {
    id: 123,
    title: `Beautiful & luxurious apartment at great location`,
    img: `img/apartment-01.jpg`,
    isPremium: true,
    price: 120,
    stars: 4,
    type: `Apartment`,
    isInBookmarks: false,
    coordinates: [52.3909553943508, 4.929309666406198],
  }
];

describe(`MainPage`, () => {
  it(`renders correctly`, () => {
    // leaflet в вызове map вызывает document.getElementById,
    // но так как тесты выполняются в тестовом окружении и в ноде, то ему jsdom возвращает null.
    // Чтобы пофиксить - создаем окружение с помощью jsdom - так мы подстраиваемся
    // под реализацию сторонней библиотеки (избегаем падения теста).
    const mapContainer = global.document.createElement(`mapContainer`);
    mapContainer.setAttribute(`id`, `map`);
    global.document.body.appendChild(mapContainer);

    const page = renderer.create(
        <MainPage
          rentalOffers={mock}
          onOfferTitleClick={jest.fn()}
        />
    ).toJSON();

    expect(page).toMatchSnapshot();
  });
});
