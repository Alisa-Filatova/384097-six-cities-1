import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {getAuthorizationStatus, getUser, getPendingAuthStatus} from '../../reducers/user/selectors';
import AppHeader from '../app-header/app-header.jsx';
import PageWrapper from '../page-wrapper/page-wrapper.jsx';
import MainPage from '../main-page/main-page.jsx';
import Favorites from '../favorites/favorites.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import OfferDetails from '../offer-details/offer-details.jsx';
import Loader from '../loader/loader.jsx';
import {ROUTES} from '../../constants/constants';
import NotFound from '../not-found/not-found.jsx';

const App = (props) => {
  const {pendingAuthorization, isAuthenticated, user} = props;

  return (
    <>
      {pendingAuthorization ? <Loader /> : (
        <PageWrapper location={props.location.pathname}>
          <AppHeader
            isAuthenticated={isAuthenticated}
            user={user}
          />
          <Switch>
            <Route
              path={ROUTES.HOME}
              component={MainPage}
              exact
            />
            <Route
              path={ROUTES.LOGIN}
              render={() => isAuthenticated ? <Redirect to={ROUTES.HOME} /> : <SignIn />}
            />
            <Route
              path={`${ROUTES.OFFER}/:id`}
              component={OfferDetails}
            />
            <Route
              path={ROUTES.FAVORITES}
              render={() => isAuthenticated ? <Favorites /> : <Redirect to={ROUTES.LOGIN} />}
            />
            <Route component={NotFound} />
          </Switch>
        </PageWrapper>
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthenticated: getAuthorizationStatus(state),
  user: getUser(state),
  pendingAuthorization: getPendingAuthStatus(state),
});

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
    isPro: PropTypes.bool,
  }),
  pendingAuthorization: PropTypes.bool,
  location: PropTypes.any,
};

export {App};
export default withRouter(connect(mapStateToProps)(App));
