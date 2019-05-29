import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {App} from './app.jsx';

configure({adapter: new Adapter()});

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
    town: {
      name: `Amsterdam`,
      coords: [52.38333, 4.9],
    },
  },
];

describe(`App`, () => {
  it(`renders correctly`, () => {
    const app = shallow(
        <App
          rentalOffers={mock}
          currentTown={mock[0].town.name}
          townsList={[`Amsterdam`, `Paris`]}
          onTownClick={jest.fn()}
        />
    );

    expect(shallowToJson(app)).toMatchSnapshot();
  });
});
