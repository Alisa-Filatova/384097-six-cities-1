import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card.jsx';

const OffersList = ({
  rentalOffers,
  onImgClick,
  className,
  prefix = `cities`,
  small,
  history,
  onFavoriteClick,
  isAuthenticated,
}) => (
  <div className={className ? className : `${prefix}__places-list places__list tabs__content`}>
    {rentalOffers.map((offer, idx) => (
      <OfferCard
        offer={offer}
        onImgClick={onImgClick}
        onFavoriteClick={onFavoriteClick}
        isAuthenticated={isAuthenticated}
        key={idx}
        prefix={prefix}
        small={small}
        history={history}
      />
    ))}
  </div>
);

OffersList.propTypes = {
  rentalOffers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onImgClick: PropTypes.func,
  className: PropTypes.string,
  prefix: PropTypes.string,
  small: PropTypes.bool,
  history: PropTypes.any,
  onFavoriteClick: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

export default OffersList;
