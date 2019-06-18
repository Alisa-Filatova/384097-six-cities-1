import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import {getAuthorizationStatus, getUser, getPendingAuthStatus} from '../../reducers/user/selectors';
import AppHeader from '../app-header/app-header.jsx';
import PageWrapper from '../page-wrapper/page-wrapper.jsx';
import MainPage from '../main-page/main-page.jsx';
import Favorites from '../favorites/favorites.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import OfferDetails from '../offer-details/offer-details.jsx';
import {PageType} from '../../types/page-type';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeOfferId: null,
    };

    this._handleGetActiveOffer = this._handleGetActiveOffer.bind(this);
  }

  render() {
    const {
      pendingAuthorization,
      isAuthenticated,
      user,
    } = this.props;

    const {activeOfferId} = this.state;

    return (
      <>
        {pendingAuthorization ? <div>Loading</div> : (
          <PageWrapper pageType={isAuthenticated ? PageType.MAIN : PageType.LOGIN}>
            <AppHeader
              isAuthenticated={isAuthenticated}
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
                  />
                }
              />
              <Route
                path="/login"
                exact
                render={() => (
                  <>
                    {isAuthenticated
                      ? <Redirect to="/" />
                      : <SignIn />
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
                    {isAuthenticated
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
}

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
    [`avatar_url`]: PropTypes.string,
    [`is_pro`]: PropTypes.bool,
  }),
  pendingAuthorization: PropTypes.bool,
};

export {App};
export default connect(mapStateToProps)(App);
