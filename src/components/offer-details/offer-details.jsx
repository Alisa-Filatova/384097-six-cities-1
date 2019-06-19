import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Operation} from '../../reducers/review/review';
import {Operation as DataOperation} from '../../reducers/data/data';
import {sortReviewsByDate, getPostReviewStatus} from '../../reducers/review/selectors';
import {getOfferById, getCloserOffers} from '../../reducers/data/selectors';
import {getAuthorizationStatus} from '../../reducers/user/selectors';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import Map from '../map/map.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import FavoriteButton from '../favorite-button/favorite-button.jsx';
import RatingStars from '../rating-stars/rating-stars.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import {PlaceType} from '../../types/place-type';
import {MAX_CLOSER_OFFERS, MAX_PLACE_IMG, ROUTES} from '../../constants/constants';

const CloserOffersList = withActiveItem(OffersList);

class OfferDetails extends React.Component {

  constructor(props) {
    super(props);

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
              {offer.isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">{offer.title}</h1>
                <FavoriteButton
                  isActive={offer.isFavorite}
                  onClick={this._handleFavoriteClick}
                  large
                />
              </div>
              <RatingStars
                rating={offer.rating}
                showValue
                prefix="property"
              />
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {PlaceType[offer.type]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} {offer.bedrooms === 1 ? `Bedroom` : `Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} {offer.maxAdults === 1 ? `adult` : `adults`}
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
                  <div
                    className={`property__avatar-wrapper ${offer.host.isPro ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                    <img
                      className="property__avatar user__avatar"
                      src={`/${offer.host.avatarUrl}`}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{offer.host.name}</span>
                  {offer.host.isPro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">{offer.description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsList reviews={reviews} />
                {isAuthenticated && (
                  <ReviewForm
                    offerId={offer.id}
                    postReviewStatus={this.props.postReviewStatus}
                  />
                )}
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
              history={this.props.history}
              onFavoriteClick={this.props.onFavoriteClick}
              isAuthenticated={isAuthenticated}
            />
          </section>
        </div>
      </main>
    );
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

OfferDetails.propTypes = {
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
  reviews: PropTypes.arrayOf(PropTypes.object),
  offers: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.any,
  getReviews: PropTypes.func,
  id: PropTypes.any,
  isAuthenticated: PropTypes.bool,
  onFavoriteClick: PropTypes.func,
  postReviewStatus: PropTypes.number,
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;

  return Object.assign({}, ownProps, {
    id,
    offer: getOfferById(state, id),
    offers: getCloserOffers(state, id).slice(0, MAX_CLOSER_OFFERS),
    reviews: sortReviewsByDate(state),
    isAuthenticated: getAuthorizationStatus(state),
    postReviewStatus: getPostReviewStatus(state),
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
