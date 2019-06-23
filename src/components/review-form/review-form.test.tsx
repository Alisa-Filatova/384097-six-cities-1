import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {ReviewForm} from './review-form';

describe(`ReviewForm`, () => {
  it(`renders correctly`, () => {
    const form = renderer.create(
        <ReviewForm
          rating={4}
          comment={`asd`}
          disabled={false}
          onRatingChange={jest.fn()}
          onCommentChange={jest.fn()}
          onSubmit={jest.fn()}
          saveReviewStatus={0}
          offerId={1}
          saveReview={jest.fn()}
        />
    ).toJSON();
    expect(form).toMatchSnapshot();
  });
});
