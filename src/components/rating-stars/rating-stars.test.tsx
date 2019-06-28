import * as React from 'react';
import * as renderer from 'react-test-renderer';
import RatingStars from './rating-stars';

describe('RatingStars', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(
        <RatingStars rating={4} showValue />
    ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
