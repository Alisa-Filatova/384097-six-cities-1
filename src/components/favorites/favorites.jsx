import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CityTab from '../city-tab/city-tab.jsx';
import OfferCard from '../offer-card/offer-card.jsx';
import {getFavoriteOffers} from '../../reducers/data/selectors';

const Favorites = ({offers}) => {
  return (
    <>
      {offers.length > 0 ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {offers.map((offer) =>
                  <li
                    className="favorites__locations-items"
                    key={offer.city.name + offer.id}
                  >
                    <div className="favorites__locations locations locations--current">
                      <CityTab city={offer.city} isActive />
                    </div>
                    <li className="favorites__places">
                      <OfferCard
                        offer={offer}
                        prefix="favorites"
                        small
                      />
                    </li>
                  </li>
                )}
              </ul>
            </section>
          </div>
        </main>
        :
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your
                  future trips.
                </p>
              </div>
            </section>
          </div>
        </main>
      }
    </>
  );
};

Favorites.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state, ownProps) => (
  Object.assign({}, ownProps, {
    offers: getFavoriteOffers(state),
  })
);

export {Favorites};
export default connect(mapStateToProps)(Favorites);


