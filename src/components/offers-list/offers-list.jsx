import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card.jsx';

const OffersList = ({rentalOffers, setActiveItem}) => (
  <div className="cities__places-list places__list tabs__content">
    {rentalOffers.map((offer, idx) => (
      <OfferCard
        activeItem={offer.id}
        offer={offer}
        onOfferTitleClick={() => {}}
        onOfferImgClick={() => setActiveItem(offer.id)}
        key={idx}
        onMouseOver={() => setActiveItem(offer.id)}
        onMouseOut={() => setActiveItem(null)}
      />
    ))}
  </div>
);

OffersList.propTypes = {
  rentalOffers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    img: PropTypes.string,
    isPremium: PropTypes.bool,
    price: PropTypes.number,
    stars: PropTypes.number,
    type: PropTypes.string,
    isInBookmarks: PropTypes.bool,
    coordinates: PropTypes.arrayOf(PropTypes.number),
    town: PropTypes.shape({
      name: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
  })).isRequired,
  setActiveItem: PropTypes.func.isRequired,
};

export default OffersList;
