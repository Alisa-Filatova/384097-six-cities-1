import * as React from 'react';
import * as renderer from 'react-test-renderer';
import NotFound from './not-found';

describe(`NotFound`, () => {
  it(`renders correctly`, () => {
    const page = renderer.create(<NotFound />).toJSON();
    expect(page).toMatchSnapshot();
  });
});
