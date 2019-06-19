import React from 'react';
import PropTypes from 'prop-types';

const RatingStars = ({rating, showValue, prefix = `place-card`}) => (
  <div className={`${prefix}__rating rating`}>
    <div className={`${prefix}__stars rating__stars`}>
      <span style={{width: (Math.round(rating) * 10) * 2 + `%`}}/>
      <span className="visually-hidden">Rating</span>
    </div>
    {showValue && (
      <span className={`${prefix}__rating-value rating__value`}>
        {Math.round(rating)}
      </span>
    )}
  </div>
);

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
  prefix: PropTypes.string,
  showValue: PropTypes.bool,
};

export default RatingStars;
