import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card.jsx';

const OffersList = ({rentalOffers, setActiveItem, onOfferTitleClick, className}) => (
  <div className={className ? className : `cities__places-list places__list tabs__content`}>
    {rentalOffers.map((offer, idx) => (
      <OfferCard
        activeItem={offer.id}
        offer={offer}
        onOfferTitleClick={() => onOfferTitleClick(offer)}
        onOfferImgClick={() => setActiveItem(offer.id)}
        key={idx}
        onMouseOver={() => setActiveItem(offer.id)}
        onMouseOut={() => {}}
        {...rentalOffers}
      />
    ))}
  </div>
);

OffersList.propTypes = {
  rentalOffers: PropTypes.arrayOf(PropTypes.object).isRequired,
  setActiveItem: PropTypes.func,
  onOfferTitleClick: PropTypes.func,
  className: PropTypes.string,
};

export default OffersList;
