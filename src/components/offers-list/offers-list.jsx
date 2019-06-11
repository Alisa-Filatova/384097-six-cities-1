import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card.jsx';

const OffersList = ({rentalOffers, setActiveItem}) => (
  <div className="cities__places-list places__list tabs__content">
    {rentalOffers.map((offer, idx) => (
      <OfferCard
        activeItem={offer.id}
        offer={offer}
        onOfferTitleClick={() => setActiveItem(offer)}
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
  rentalOffers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    [`preview_image`]: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    [`is_premium`]: PropTypes.bool,
    [`is_favorite`]: PropTypes.bool,
    bedrooms: PropTypes.number,
    goods: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    type: PropTypes.string,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number,
    }),
    city: PropTypes.shape({
      name: PropTypes.string,
      location: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        zoom: PropTypes.number,
      }),
    }),
    host: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      [`is_pro`]: PropTypes.bool,
      [`avatar_url`]: PropTypes.string,
    }),
  })).isRequired,
  setActiveItem: PropTypes.func.isRequired,
};

export default OffersList;
