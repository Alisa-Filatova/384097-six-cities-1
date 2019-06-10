import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducers/data/data';
import {ActionCreator as UserActionCreator} from '../../reducers/user/user';
import {getOffers, getCurrentCity, getCityOffers} from '../../reducers/data/selectors';
import {getAuthorizationStatus, getUser} from '../../reducers/user/selectors';
import AppHeader from '../app-header/app-header.jsx';
import PageWrapper from '../page-wrapper/page-wrapper.jsx';
import MainPage from '../main-page/main-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import {PageType} from '../../enums/page-type';

const App = ({rentalOffers, onTownClick, currentTown, cityOffers, isAuthorizationRequired, signIn, user}) => (
  <PageWrapper pageType={isAuthorizationRequired ? PageType.MAIN : PageType.LOGIN}>
    <AppHeader
      isAuthenticated={isAuthorizationRequired}
      user={user}
    />
    {isAuthorizationRequired ?
      <MainPage
        rentalOffers={rentalOffers}
        onTownClick={onTownClick}
        currentTown={currentTown}
        cityOffers={cityOffers}
      />
      :
      <SignIn
        signIn={signIn}
        user={user}
      />
    }
  </PageWrapper>
);

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentTown: getCurrentCity(state),
  rentalOffers: getOffers(state),
  cityOffers: getCityOffers(state),
  isAuthorizationRequired: getAuthorizationStatus(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTownClick: (currentTown) => {
    dispatch(ActionCreator.changeTown(currentTown));
  },
  signIn: (data) => {
    dispatch(UserActionCreator.signIn(data));
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
  onTownClick: PropTypes.func.isRequired,
  currentTown: PropTypes.object.isRequired,
  cityOffers: PropTypes.array.isRequired,
  isAuthorizationRequired: PropTypes.bool,
  signIn: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    [`avatar_url`]: PropTypes.string,
    [`is_pro`]: PropTypes.bool,
  }),
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
