import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import FavoriteButton from '../favorite-button/favorite-button.jsx';

const OfferCard = (props) => {
  const {offer, onOfferImgClick, onOfferTitleClick, onMouseOver, onMouseOut, prefix = `cities`, small, onFavoriteClick} = props;

  return (
    <article
      className={`${prefix}__place-card place-card`}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {offer.is_premium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${prefix}__image-wrapper place-card__image-wrapper`}>
        <a>
          <img
            onClick={onOfferImgClick}
            className="place-card__image"
            src={offer.preview_image}
            width={small ? 150 : 260}
            height={small ? 110 : 200}
            alt={offer.title}
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            isActive={offer.is_favorite}
            onClick={onFavoriteClick}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: (offer.rating * 10) * 2 + `%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`} onClick={onOfferTitleClick}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  offer: PropTypes.shape({
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
  }).isRequired,
  onOfferImgClick: PropTypes.func,
  onOfferTitleClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  activeItem: PropTypes.number,
  onFavoriteClick: PropTypes.func,
  small: PropTypes.bool,
  prefix: PropTypes.string,
};

export default OfferCard;
