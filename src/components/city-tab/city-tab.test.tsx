import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CityTab from './city-tab';

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
