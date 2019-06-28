import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Map from './map';
import {City, Offer} from '../../types/offer';
import {offersMock} from '../../mocks/offers';
import {cityMock} from '../../mocks/city';

describe('Map', () => {
  it('renders correctly', () => {
    // leaflet в вызове map вызывает document.getElementById,
    // но так как тесты выполняются в тестовом окружении и в ноде, то ему jsdom возвращает null.
    // Чтобы пофиксить - создаем окружение с помощью jsdom - так мы подстраиваемся
    // под реализацию сторонней библиотеки (избегаем падения теста).
    const globalAny: any = global;
    const mapContainer = globalAny.document.createElement('mapContainer');
    mapContainer.setAttribute('id', 'map');
    globalAny.document.body.appendChild(mapContainer);

    const map = renderer.create(
        <Map
          cityOffers={offersMock as Offer[]}
          currentCity={cityMock as City}
          activeOfferId={1}
          zoom={false}
        />
    ).toJSON();

    expect(map).toMatchSnapshot();
  });
});
