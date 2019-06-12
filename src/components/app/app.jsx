import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import {ActionCreator} from '../../reducers/data/data';
import {ActionCreator as UserActionCreator} from '../../reducers/user/user';
import {getOffers, getCurrentCity, getCityOffers, getCities} from '../../reducers/data/selectors';
import {getAuthorizationStatus, getUser} from '../../reducers/user/selectors';
import AppHeader from '../app-header/app-header.jsx';
import PageWrapper from '../page-wrapper/page-wrapper.jsx';
import MainPage from '../main-page/main-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import OfferDetails from '../offer-details/offer-details.jsx';
import {PageType} from '../../enums/page-type';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeOfferId: null,
    };
  }

  render() {
    const {rentalOffers, cities, onCityClick, currentCity, cityOffers, isAuthorizationRequired, login, user} = this.props;
    const {activeOfferId} = this.state;
    // const currentOffer = rentalOffers.filter((offer) => offer.id === activeOfferId)[0];

    return (
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
                cities={cities}
                onCityClick={onCityClick}
                currentCity={currentCity}
                cityOffers={cityOffers}
                setActiveItem={this._handleGetActiveOffer.bind(this)}
                activeOfferId={activeOfferId}
              />
            }
          />
          <Route
            path="/login"
            exact
            render={() => (
              <>
              {!isAuthorizationRequired
                ?
                <SignIn
                  signIn={login}
                  user={user}
                />
                :
                <Redirect to='/' />
              }
            </>
            )}
          />
          <Route
            exact
            path={`/offer/:${activeOfferId}`}
            render={() => <OfferDetails rentalOffers={rentalOffers} activeOfferId={activeOfferId} />}
          />
        </Switch>
      </PageWrapper>
    );
  }

  _handleGetActiveOffer(offerId) {
    this.setState((prevState) => {
      return Object.assign({}, prevState, {activeOfferId: offerId});
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
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
