import React from 'react';
import PropTypes from 'prop-types';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import Map from '../map/map.jsx';
import OffersList from '../offers-list/offers-list.jsx';

const OfferDetails = ({offer, reviews, nearOffers}) => {
  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer.images.map((image, idx) =>
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
              <button
                className={
                  `place-card__bookmark-button button 
                  ${offer.is_favorite ? `place-card__bookmark-button--active` : ``}`
                }
                type="button"
              >
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"/>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: (offer.rating * 10) * 2 + `%`}} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {offer.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {offer.max_adults} adults
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
                  <li key={good} className="property__inside-item">{good}</li>
                )}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img
                    className="property__avatar user__avatar"
                    src={offer.host.avatar_url}
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
              <form className="reviews__form form" action="#" method="post">
                <label className="reviews__label form__label" htmlFor="review">Your review</label>
                <div className="reviews__rating-form form__rating">
                  <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"/>
                  <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"/>
                    </svg>
                  </label>

                  <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"/>
                  <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"/>
                    </svg>
                  </label>

                  <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"/>
                  <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"/>
                    </svg>
                  </label>

                  <input
                    className="form__rating-input visually-hidden"
                    name="rating"
                    value="2"
                    id="2-stars"
                    type="radio"
                  />
                  <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"/>
                    </svg>
                  </label>

                  <input
                    className="form__rating-input visually-hidden"
                    name="rating"
                    value="1"
                    id="1-star"
                    type="radio"
                  />
                  <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"/>
                    </svg>
                  </label>
                </div>
                <textarea
                  className="reviews__textarea form__textarea"
                  id="review"
                  name="review"
                  placeholder="Tell how was your stay, what you like and what can be improved"
                />
                <div className="reviews__button-wrapper">
                  <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
                    stay with at least <b className="reviews__text-amount">50 characters</b>.
                  </p>
                  <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
                </div>
              </form>
            </section>
          </div>
        </div>
        <Map
          className="property__map map"
          key={offer.city.name}
          currentCity={offer.city}
          activeOfferId={offer.id}
          cityOffers={nearOffers.slice(0, 3)}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OffersList rentalOffers={nearOffers.slice(0, 3)} />
        </section>
      </div>
    </main>
  );
};

OfferDetails.propTypes = {
  offer: PropTypes.object.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object),
  nearOffers: PropTypes.arrayOf(PropTypes.object),
};

export default OfferDetails;
