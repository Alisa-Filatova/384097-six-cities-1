import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card.jsx';

const OffersList = ({rentalOffers, setActiveItem, className, prefix = `cities`, small}) => (
  <div className={className ? className : `${prefix}__places-list places__list tabs__content`}>
    {rentalOffers.map((offer, idx) => (
      <OfferCard
        offer={offer}
        onImgClick={() => setActiveItem(offer.id)}
        key={idx}
        prefix={prefix}
        small={small}
        {...rentalOffers}
      />
    ))}
  </div>
);

OffersList.propTypes = {
  rentalOffers: PropTypes.arrayOf(PropTypes.object).isRequired,
  setActiveItem: PropTypes.func,
  className: PropTypes.string,
  prefix: PropTypes.string,
  small: PropTypes.bool,
};

export default OffersList;
