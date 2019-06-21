import * as React from 'react';
import {connect} from 'react-redux';
import AppFooter from '../app-footer/app-footer';
import FavoriteOffersGroup from '../favotite-offers-group/favorite-offers-group';
import withRedirectRoute from '../../hocs/with-redirect-route/with-redirect-route';
import {getFavoriteOffersGroupedByCity} from '../../reducers/data/selectors';
import {Operation as DataOperation} from '../../reducers/data/data';
import {getAuthorizationStatus} from '../../reducers/user/selectors';
import {CityOffersGroup, Offer} from '../../types/offer';
import {ROUTES} from '../../constants/constants';

interface Props {
  offers: CityOffersGroup;
  onFavoriteClick: (offer: Offer) => void;
  isAuthenticated: boolean;
  loadFavoriteOffers: () => void;
}

class Favorites extends React.PureComponent<Props> {

  componentDidMount() {
    this.props.loadFavoriteOffers();
  }

  render() {
    const {offers, isAuthenticated, onFavoriteClick} = this.props;

    return (
      <>
        {Object.keys(offers).length > 0 ? (
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <FavoriteOffersGroup
                  offersGroup={offers}
                  isAuthenticated={isAuthenticated}
                  onFavoriteClick={onFavoriteClick}
                />
              </section>
            </div>
          </main>
        ) : (
          <main
            className="page__main page__main--favorites page__main--favorites-empty"
            style={{height: `70vh`}}
          >
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
        )}
        <AppFooter/>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  offers: getFavoriteOffersGroupedByCity(state),
  isAuthenticated: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteClick: (offer) => {
    dispatch(DataOperation.toggleFavorite(offer));
  },
  loadFavoriteOffers: () => {
    dispatch(DataOperation.loadFavoriteOffers());
  }
});

export {Favorites};
export default withRedirectRoute(
    connect(mapStateToProps, mapDispatchToProps)(Favorites),
    ROUTES.LOGIN,
    false
);
