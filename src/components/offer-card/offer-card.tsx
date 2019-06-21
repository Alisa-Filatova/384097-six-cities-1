import * as React from 'react';
import {Link} from 'react-router-dom';
import FavoriteButton from '../favorite-button/favorite-button.jsx';
import RatingStars from '../rating-stars/rating-stars.jsx';
import {ROUTES} from '../../constants/constants';
import {Offer} from '../../types/offer';

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

interface Props {
  offer: Offer;
  isAuthenticated: boolean;
  onFavoriteClick: (Offer) => void;
  history: History;
  onImgClick?: (id: number) => void;
  prefix?: string;
  small?: boolean;
}

class OfferCard extends React.PureComponent<Props> {

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

export default OfferCard;

