import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Review from './review';
import {reviewMock} from '../../mocks/review';
import {Review as ReviewType} from '../../types/user';

describe(`Review`, () => {
  it(`renders correctly`, () => {
    const wrapper = renderer.create(
        <Review review={reviewMock as ReviewType} />
    ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
