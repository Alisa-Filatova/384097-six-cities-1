import * as React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter} from 'react-router-dom';
import {getAuthorizationStatus, getUser, getPendingAuthStatus} from '../../reducers/user/selectors';
import AppHeader from '../app-header/app-header';
import PageWrapper from '../page-wrapper/page-wrapper';
import MainPage from '../main-page/main-page';
import Favorites from '../favorites/favorites';
import SignIn from '../sign-in/sign-in';
import OfferDetails from '../offer-details/offer-details';
import NotFound from '../not-found/not-found';
import ErrorMessage from '../error-message/error-message';
import Loader from '../loader/loader';
import {ROUTES} from '../../constants/constants';
import {User} from '../../types/user';

interface Props {
  isAuthenticated: boolean;
  user: User;
  pendingAuthorization: boolean;
  location: {};
}

const App: React.FunctionComponent<Props> = ({pendingAuthorization, isAuthenticated, user}) => (
  <>
    {pendingAuthorization ? <Loader /> : (
      <PageWrapper location={location.pathname}>
        {location.pathname !== ROUTES.ERROR && (
          <AppHeader
            isAuthenticated={isAuthenticated}
            user={user}
          />
        )}
        <Switch>
          <Route
            path={ROUTES.HOME}
            component={MainPage}
            exact
          />
          <Route
            path={ROUTES.LOGIN}
            component={SignIn}
          />
          <Route
            path={`${ROUTES.OFFER}/:id`}
            component={OfferDetails}
          />
          <Route
            path={ROUTES.FAVORITES}
            component={Favorites}
          />
          <Route
            path={ROUTES.ERROR}
            component={ErrorMessage}
          />
          <Route component={NotFound} />
        </Switch>
      </PageWrapper>
    )}
  </>
);

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isAuthenticated: getAuthorizationStatus(state),
  user: getUser(state),
  pendingAuthorization: getPendingAuthStatus(state),
});

export {App};
export default withRouter(connect(mapStateToProps)(App));
