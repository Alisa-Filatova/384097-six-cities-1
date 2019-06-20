import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list.jsx';

const mock = [
  {
    name: `Amsterdam`,
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    }
  },
  {
    name: `Paris`,
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    }
  },
];

describe(`CitiesList`, () => {
  it(`renders correctly`, () => {
    const list = renderer.create(
        <CitiesList
          cities={mock}
          currentCity={mock[0]}
          onCityClick={jest.fn()}
        />
    ).toJSON();
    expect(list).toMatchSnapshot();
  });
});
