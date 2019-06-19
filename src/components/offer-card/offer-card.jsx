import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import FavoriteButton from '../favorite-button/favorite-button.jsx';
import RatingStars from '../rating-stars/rating-stars.jsx';
import {ROUTES} from '../../constants/constants';

const ImageSize = {
  DEFAULT: {
    width: 260,
    height: 200,
  },
  SMALL: {
    width: 150,
    height: 110,
  }
};

class OfferCard extends React.PureComponent {

  constructor(props) {
    super(props);

    this._handleImgClick = this._handleImgClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  render() {
    const {offer, prefix = `cities`, small} = this.props;

    return (
      <article className={`${prefix}__place-card ${prefix}__card place-card`}>
        {offer.isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        }
        <div className={`${prefix}__image-wrapper place-card__image-wrapper`}>
          <a onClick={this._handleImgClick}>
            <img
              className="place-card__image"
              src={offer.previewImage}
              width={small ? ImageSize.SMALL.width : ImageSize.DEFAULT.width}
              height={small ? ImageSize.SMALL.height : ImageSize.DEFAULT.height}
              alt={offer.title}
            />
          </a>
        </div>
        <div className={`${prefix}__card-info place-card__info`}>
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{offer.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <FavoriteButton
              isActive={offer.isFavorite}
              onClick={this._handleFavoriteClick}
            />
          </div>
          <RatingStars rating={offer.rating} />
          <h2 className="place-card__name">
            <Link to={`${ROUTES.OFFER}/${offer.id}`}>{offer.title}</Link>
          </h2>
          <p className="place-card__type">{offer.type}</p>
        </div>
      </article>
    );
  }

  _handleImgClick(event) {
    event.preventDefault();
    const {offer, onImgClick} = this.props;

    if (onImgClick) {
      onImgClick(offer.id);
    }
  }

  _handleFavoriteClick() {
    const {offer, onFavoriteClick, isAuthenticated, history} = this.props;

    if (isAuthenticated) {
      onFavoriteClick(offer);
    } else {
      history.push(ROUTES.LOGIN);
    }
  }
}

OfferCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    previewImage: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    isPremium: PropTypes.bool,
    isFavorite: PropTypes.bool,
    maxAdults: PropTypes.number,
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
      isPro: PropTypes.bool,
      avatarUrl: PropTypes.string,
    }),
  }),
  onImgClick: PropTypes.func,
  onFavoriteClick: PropTypes.func,
  small: PropTypes.bool,
  prefix: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  history: PropTypes.any,
};

export default OfferCard;

