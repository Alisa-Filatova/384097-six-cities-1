import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Operation} from '../../reducers/data/data';
import FavoriteButton from '../favorite-button/favorite-button.jsx';
import {redirectToUrl} from '../../utils/links';
import {getAuthorizationStatus} from '../../reducers/user/selectors';

class OfferCard extends React.PureComponent {

  constructor(props) {
    super(props);

    this._redirectToLogin = this._redirectToLogin.bind(this);
    this._handleImgClick = this._handleImgClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  render() {
    const {offer, prefix = `cities`, small, isAuthenticated} = this.props;

    return (
      <article className={`${prefix}__place-card place-card`}>
        {offer.is_premium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        }
        <div className={`${prefix}__image-wrapper place-card__image-wrapper`}>
          <a onClick={this._handleImgClick}>
            <img
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
              onClick={isAuthenticated ? this._handleFavoriteClick : this._redirectToLogin}
            />
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: (offer.rating * 10) * 2 + `%`}}/>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
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
      onImgClick(offer);
    }
  }

  _handleFavoriteClick() {
    const {offer, onFavoriteClick} = this.props;
    onFavoriteClick(offer);
  }

  _redirectToLogin() {
    const {history} = this.props;
    redirectToUrl(`/login`, history);
  }
}

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
  onImgClick: PropTypes.func,
  onFavoriteClick: PropTypes.func,
  small: PropTypes.bool,
  prefix: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  history: PropTypes.any,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthenticated: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteClick: (offer) => {
    dispatch(Operation.changeFavorites(offer));
  },
});

export {OfferCard};
export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);

