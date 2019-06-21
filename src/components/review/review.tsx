import * as React from 'react';
import RatingStars from '../rating-stars/rating-stars';
import {Review as ReviewType} from '../../types/user';

interface Props {
  review: ReviewType;
}

const Review: React.FunctionComponent<Props> = ({review}) => {
  const reviewDate = new Date(review.date).toLocaleDateString(`en-US`, {
    month: `long`,
    year: `numeric`,
  });

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <RatingStars
          rating={review.rating}
          prefix="reviews"
        />
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>
          {reviewDate}
        </time>
      </div>
    </li>
  );
};

export default Review;
