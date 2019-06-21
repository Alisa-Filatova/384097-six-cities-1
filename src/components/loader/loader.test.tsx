import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Loader from './loader';

describe(`Loader`, () => {
  it(`renders correctly`, () => {
    const loader = renderer.create(<Loader />).toJSON();
    expect(loader).toMatchSnapshot();
  });
});
