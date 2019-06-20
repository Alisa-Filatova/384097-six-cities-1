import React from 'react';
import renderer from 'react-test-renderer';
import RatingStars from './rating-stars.jsx';

describe(`RatingStars`, () => {
  it(`renders correctly`, () => {
    const wrapper = renderer.create(
        <RatingStars rating={4} showValue />
    ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
