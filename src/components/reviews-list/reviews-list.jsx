import React from 'react';
import PropTypes from 'prop-types';
import Review from '../review/review.jsx';

const ReviewsList = ({reviews}) => {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
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
