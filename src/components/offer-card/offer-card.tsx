import * as React from 'react';
import {Link} from 'react-router-dom';
import FavoriteButton from '../favorite-button/favorite-button';
import RatingStars from '../rating-stars/rating-stars';
import {ROUTES} from '../../constants/constants';
import {Offer} from '../../types/offer';

const imageSize = {
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
  history?: any[];
  onImgClick?: (id: number) => void;
  prefix?: string;
  small?: boolean;
}

interface DefaultProps {
  prefix: string;
}

class OfferCard extends React.PureComponent<Props & DefaultProps> {

  static defaultProps = {
    prefix: 'cities',
  };

  private handleImgClick = (event) => {
    event.preventDefault();
    const {offer, onImgClick} = this.props;

    if (onImgClick) {
      onImgClick(offer.id);
    }
  };

  private handleFavoriteClick = () => {
    const {offer, onFavoriteClick, isAuthenticated, history} = this.props;

    if (isAuthenticated) {
      onFavoriteClick(offer);
    } else {
      history.push(ROUTES.LOGIN);
    }
  };

  render() {
    const {offer, prefix, small, onImgClick} = this.props;

    return (
      <article className={`${prefix}__place-card ${prefix}__card place-card`}>
        {offer.isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className={`${prefix}__image-wrapper place-card__image-wrapper`}>
          <a
            onClick={this.handleImgClick}
            style={{cursor: onImgClick ? 'pointer' : 'default'}}
          >
            <img
              className="place-card__image"
              src={offer.previewImage}
              width={small ? imageSize.SMALL.width : imageSize.DEFAULT.width}
              height={small ? imageSize.SMALL.height : imageSize.DEFAULT.height}
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
              onClick={this.handleFavoriteClick}
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
}

export default OfferCard;

