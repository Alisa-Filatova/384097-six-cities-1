import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import {ActionCreator} from '../../reducers/data/data';
import {ActionCreator as UserActionCreator} from '../../reducers/user/user';
import {
  getOffers,
  getCurrentCity,
  getCityOffers,
  getCities,
} from '../../reducers/data/selectors';
import {getAuthorizationStatus, getUser, getPendingAuthStatus} from '../../reducers/user/selectors';
import AppHeader from '../app-header/app-header.jsx';
import PageWrapper from '../page-wrapper/page-wrapper.jsx';
import MainPage from '../main-page/main-page.jsx';
import Favorites from '../favorites/favorites.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import OfferDetails from '../offer-details/offer-details.jsx';
import {PageType} from '../../types/page-type';
import {SortType} from '../../types/sort-type';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeOfferId: null,
      activeFilter: SortType.POPULAR,
    };

    this._handleGetActiveOffer = this._handleGetActiveOffer.bind(this);
    this._handleGetActiveFilter = this._handleGetActiveFilter.bind(this);
  }

  render() {
    const {
      pendingAuthorization,
      isAuthorizationRequired,
      user,
    } = this.props;

    const {activeOfferId, activeFilter} = this.state;

    return (
      <>
        {pendingAuthorization ? <div>Loading</div> : (
          <PageWrapper pageType={isAuthorizationRequired ? PageType.MAIN : PageType.LOGIN}>
            <AppHeader
              isAuthenticated={isAuthorizationRequired}
              user={user}
            />
            <Switch>
              <Route
                path="/"
                exact
                render={() =>
                  <MainPage
                    {...this.props}
                    setActiveItem={this._handleGetActiveOffer}
                    activeOfferId={activeOfferId}
                    setActiveFilter={this._handleGetActiveFilter}
                    currentFilter={activeFilter}
                  />
                }
              />
              <Route
                path="/login"
                exact
                render={() => (
                  <>
                    {isAuthorizationRequired
                      ? <Redirect to="/" />
                      : <SignIn user={user} />
                    }
                  </>
                )}
              />
              <Route
                path="/offer/:id"
                render={(props) => (
                  <OfferDetails
                    {...props}
                    setActiveItem={this._handleGetActiveOffer}
                  />
                )}
              />
              <Route
                path="/favorites"
                render={() => (
                  <>
                    {isAuthorizationRequired
                      ? <Favorites />
                      : <Redirect to="/login" />
                    }
                  </>
                )}
              />
            </Switch>
          </PageWrapper>
        )}
      </>
    );
  }

  _handleGetActiveOffer(offerId) {
    this.setState((prevState) => {
      return Object.assign({}, prevState, {activeOfferId: offerId});
    });
  }

  _handleGetActiveFilter(filter) {
    this.setState((prevState) => {
      return Object.assign({}, prevState, {activeFilter: filter});
    });
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentCity: getCurrentCity(state),
  rentalOffers: getOffers(state),
  cityOffers: getCityOffers(state),
  isAuthorizationRequired: getAuthorizationStatus(state),
  user: getUser(state),
  cities: getCities(state),
  pendingAuthorization: getPendingAuthStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (currentCity) => {
    dispatch(ActionCreator.changeCity(currentCity));
  },
  login: (data) => {
    dispatch(UserActionCreator.login(data));
  },
});

App.propTypes = {
  rentalOffers: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  onCityClick: PropTypes.func.isRequired,
  currentCity: PropTypes.object.isRequired,
  cityOffers: PropTypes.array.isRequired,
  isAuthorizationRequired: PropTypes.bool,
  login: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    [`avatar_url`]: PropTypes.string,
    [`is_pro`]: PropTypes.bool,
  }),
  cities: PropTypes.arrayOf(PropTypes.object),
  onCardTitleClick: PropTypes.func,
  currentOffer: PropTypes.object,
  onLowToHighClick: PropTypes.func,
  onHighToLowClick: PropTypes.func,
  onTopRatedClick: PropTypes.func,
  onPopularClick: PropTypes.func,
  favoriteOffers: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.any,
  pendingAuthorization: PropTypes.bool,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
