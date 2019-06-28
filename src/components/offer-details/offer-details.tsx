import * as React from 'react';
import {connect} from 'react-redux';
import {Operation} from '../../reducers/review/review';
import {Operation as DataOperation} from '../../reducers/data/data';
import {sortReviewsByDate, getSaveReviewStatus} from '../../reducers/review/selectors';
import {getOfferById, getCloserOffers} from '../../reducers/data/selectors';
import {getAuthorizationStatus} from '../../reducers/user/selectors';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import OffersList from '../offers-list/offers-list';
import ReviewForm from '../review-form/review-form';
import FavoriteButton from '../favorite-button/favorite-button';
import RatingStars from '../rating-stars/rating-stars';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import PlaceType from '../../types/enums/place-type';
import {MAX_CLOSER_OFFERS, MAX_PLACE_IMG, ROUTES} from '../../constants/constants';
import {Offer} from '../../types/offer';
import {Review} from '../../types/user';

const CloserOffersList = withActiveItem(OffersList);

interface Props {
  id: number;
  offer: Offer;
  nearOffers: Offer[];
  getReviews: () => void;
  reviews: Review[];
  isAuthenticated: boolean;
  saveReviewStatus: number;
  onFavoriteClick: (Offer) => void;
  history?: any[];
}

class OfferDetails extends React.PureComponent<Props> {

  componentDidMount() {
    this.props.getReviews();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.props.getReviews();
    }
  }

  private handleFavoriteClick = () => {
    const {offer, onFavoriteClick, isAuthenticated, history} = this.props;

    if (isAuthenticated) {
      onFavoriteClick(offer);
    } else {
      history.push(ROUTES.LOGIN);
    }
  };

  render() {
    const {
      offer,
      nearOffers,
      reviews,
      isAuthenticated,
      onFavoriteClick,
      history,
      saveReviewStatus,
    } = this.props;

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
                  onClick={this.handleFavoriteClick}
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
                  {PlaceType[offer.type.toUpperCase()]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} {offer.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} {offer.maxAdults === 1 ? 'adult' : 'adults'}
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
                    className={`property__avatar-wrapper ${offer.host.isPro ? 'property__avatar-wrapper--pro' : ''} 
                    user__avatar-wrapper`}
                  >
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
                    saveReviewStatus={saveReviewStatus}
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
            cityOffers={nearOffers.concat(offer)}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <CloserOffersList
              className="near-places__list places__list"
              rentalOffers={nearOffers}
              history={history}
              onFavoriteClick={onFavoriteClick}
              isAuthenticated={isAuthenticated}
            />
          </section>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.match.params;

  return {
    ...ownProps,
    id,
    offer: getOfferById(state, id),
    nearOffers: getCloserOffers(state, id).slice(0, MAX_CLOSER_OFFERS),
    reviews: sortReviewsByDate(state),
    isAuthenticated: getAuthorizationStatus(state),
    saveReviewStatus: getSaveReviewStatus(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  getReviews: () => {
    dispatch(Operation.getReviewsList(ownProps.match.params.id));
  },
  onFavoriteClick: (offer) => {
    dispatch(DataOperation.toggleFavorite(offer));
  },
});

export {OfferDetails};
export default connect(mapStateToProps, mapDispatchToProps)(OfferDetails);
