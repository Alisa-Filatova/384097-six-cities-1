import React from 'react';
import renderer from 'react-test-renderer';
import CityTab from './city-tab.jsx';

describe(`CityTab`, () => {
  it(`renders correctly`, () => {
    const tab = renderer.create(
        <CityTab
          city={`Amsterdam`}
          onCityClick={jest.fn()}
        />
    ).toJSON();
    expect(tab).toMatchSnapshot();
  });
});
