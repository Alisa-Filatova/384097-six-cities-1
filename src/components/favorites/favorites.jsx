import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CityTab from '../city-tab/city-tab.jsx';
import AppFooter from '../app-footer/app-footer.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import {getFavoriteOffers, sortFavoritesListByCities} from '../../reducers/data/selectors';

const Favorites = ({offers}) => {
  const favoriteOffers = sortFavoritesListByCities(offers);

  return (
    <>
      {offers.length > 0 ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <div className="favorites__list">
                {Object.entries(favoriteOffers).map(([key, value]) => (
                  <div
                    className="favorites__locations-items"
                    key={key}
                  >
                    <div className="favorites__locations locations locations--current">
                      <CityTab city={key} isActive />
                    </div>
                    <OffersList
                      className="favorites__places"
                      rentalOffers={value}
                      prefix="favorites"
                      small
                    />
                  </div>
                ))}
              </div>
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
      <AppFooter />
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

