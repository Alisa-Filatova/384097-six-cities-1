import React from 'react';
import renderer from 'react-test-renderer';
import Loader from './loader.jsx';

describe(`Loader`, () => {
  it(`renders correctly`, () => {
    const loader = renderer.create(<Loader />).toJSON();
    expect(loader).toMatchSnapshot();
  });
});
