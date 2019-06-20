import React from 'react';
import renderer from 'react-test-renderer';
import {ReviewForm} from './review-form.jsx';

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
          postReviewStatus={0}
        />
    ).toJSON();
    expect(form).toMatchSnapshot();
  });
});
