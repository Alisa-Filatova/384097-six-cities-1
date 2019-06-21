import * as React from 'react';
import Review from '../review/review';
import {Review as ReviewType} from '../../types/user';
import {MAX_COMMENTS} from '../../constants/constants';

interface Props {
  reviews: ReviewType[];
}

const ReviewsList: React.FunctionComponent<Props> = ({reviews}) => {
  return (
    <>
      <h2 className="reviews__title">
        {reviews.length === 1 ? `Review` : `Reviews`} &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.slice(0, MAX_COMMENTS).map((review) => (
          <Review
            review={review}
            key={review.user.name + review.id}
          />
        ))}
      </ul>
    </>
  );
};

export default ReviewsList;
