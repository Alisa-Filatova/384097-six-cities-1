import * as React from 'react';
import * as renderer from 'react-test-renderer';
import MainPageEmpty from './main-page-empty';

const mock = {
  name: `Amsterdam`,
  location: {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  }
};

describe(`MainPageEmpty`, () => {
  it(`renders correctly`, () => {
    const page = renderer.create(
        <MainPageEmpty currentCity={mock} />
    ).toJSON();
    expect(page).toMatchSnapshot();
  });
});
