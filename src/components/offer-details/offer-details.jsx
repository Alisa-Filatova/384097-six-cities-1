import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Operation} from '../../reducers/review/review';
import {Operation as DataOperation} from '../../reducers/data/data';
import {getReviews} from '../../reducers/review/selectors';
import {getOfferById, getCloserOffers} from '../../reducers/data/selectors';
import {getAuthorizationStatus} from '../../reducers/user/selectors';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import Map from '../map/map.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import FavoriteButton from '../favorite-button/favorite-button.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import {PlaceType} from '../../types/place-type';
import {MAX_CLOSER_OFFERS, MAX_PLACE_IMG} from '../../constants/constants';
import {redirectToUrl} from '../../utils/links';

const CloserOffersList = withActiveItem(OffersList);

class OfferDetails extends React.Component {

  constructor(props) {
    super(props);

    this._redirectToId = this._redirectToId.bind(this);
    this._redirectToLogin = this._redirectToLogin.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  componentDidMount() {
    this.props.getReviews();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.props.getReviews();
    }
  }

  render() {
    const {offer, offers, reviews, isAuthenticated, setActiveItem} = this.props;

    if (!offer) {
      return null;
    }

    return (
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.slice(0, MAX_PLACE_IMG).map((image, idx) =>
                <div className="property__image-wrapper" key={image + idx}>
                  <img className="property__image" src={image} alt="Photo studio" />
                </div>
              )}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.is_premium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">{offer.title}</h1>
                <FavoriteButton
                  isActive={offer.is_favorite}
                  onClick={isAuthenticated ? this._handleFavoriteClick : this._redirectToLogin}
                  large
                />
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: (offer.rating * 10) * 2 + `%`}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {PlaceType[offer.type]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} {offer.bedrooms === 1 ? `Bedroom` : `Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.max_adults} {offer.max_adults === 1 ? `adult` : `adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods.map((good) =>
                    <li key={good} className="property__inside-item">
                      {good}
                    </li>
                  )}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={`/${offer.host.avatar_url}`}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{offer.host.name}</span>
                  {offer.host.is_pro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">{offer.description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsList reviews={reviews} />
                {isAuthenticated && <ReviewForm offerId={offer.id} />}
              </section>
            </div>
          </div>
          <Map
            className="property__map map"
            key={offer.city.name}
            currentCity={offer.city}
            activeOfferId={offer.id}
            cityOffers={offers.concat(offer)}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <CloserOffersList
              className="near-places__list places__list"
              rentalOffers={offers}
              onOfferTitleClick={this._redirectToId}
              setActiveItem={setActiveItem}
            />
          </section>
        </div>
      </main>
    );
  }

  _redirectToId(item) {
    const {history} = this.props;
    redirectToUrl(`/offer/${item.id}`, history);
  }

  _redirectToLogin() {
    const {history} = this.props;
    redirectToUrl(`/login`, history);
  }

  _handleFavoriteClick() {
    const {offer, onFavoriteClick} = this.props;
    onFavoriteClick(offer);
  }
}

OfferDetails.propTypes = {
  offer: PropTypes.object,
  reviews: PropTypes.arrayOf(PropTypes.object),
  offers: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.any,
  getReviews: PropTypes.func,
  id: PropTypes.any,
  isAuthenticated: PropTypes.bool,
  setActiveItem: PropTypes.func,
  onFavoriteClick: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;

  return Object.assign({}, ownProps, {
    id,
    offer: getOfferById(state, id),
    offers: getCloserOffers(state, id).slice(0, MAX_CLOSER_OFFERS),
    reviews: getReviews(state),
    isAuthenticated: getAuthorizationStatus(state),
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  getReviews: () => {
    dispatch(Operation.getReviewsList(ownProps.match.params.id));
  },
  onFavoriteClick: (offer) => {
    dispatch(DataOperation.changeFavorites(offer));
  },
});

export {OfferDetails};
export default connect(mapStateToProps, mapDispatchToProps)(OfferDetails);
