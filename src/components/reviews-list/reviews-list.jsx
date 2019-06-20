import React from 'react';
import PropTypes from 'prop-types';
import Review from '../review/review.jsx';
import {MAX_COMMENTS} from '../../constants/constants';

const ReviewsList = ({reviews}) => {
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

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object),
};

export default ReviewsList;
