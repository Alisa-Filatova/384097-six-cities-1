import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from './not-found.jsx';

describe(`NotFound`, () => {
  it(`renders correctly`, () => {
    const page = renderer.create(<NotFound />).toJSON();
    expect(page).toMatchSnapshot();
  });
});
