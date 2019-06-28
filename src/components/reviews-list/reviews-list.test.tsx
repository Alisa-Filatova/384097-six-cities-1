import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ReviewsList from './reviews-list';
import {reviewsListMock} from '../../mocks/reviews-list';
import {Review} from '../../types/user';

describe('ReviewsList', () => {
  it('renders correctly', () => {
    const form = renderer.create(
        <ReviewsList reviews={reviewsListMock as Review[]} />
    ).toJSON();
    expect(form).toMatchSnapshot();
  });
});
