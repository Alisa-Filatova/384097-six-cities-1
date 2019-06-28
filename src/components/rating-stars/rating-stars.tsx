import * as React from 'react';

interface Props {
  rating: number;
  showValue?: boolean;
  prefix?: string;
}

const RatingStars: React.FunctionComponent<Props> = ({rating, showValue, prefix = 'place-card'}) => (
  <div className={`${prefix}__rating rating`}>
    <div className={`${prefix}__stars rating__stars`}>
      <span style={{width: `${(Math.round(rating) * 10) * 2}%`}} />
      <span className="visually-hidden">Rating</span>
    </div>
    {showValue && (
      <span className={`${prefix}__rating-value rating__value`}>
        {Math.round(rating)}
      </span>
    )}
  </div>
);

export default RatingStars;
