import * as React from 'react';
import {Redirect} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../../reducers/user/selectors';
import {ROUTES} from '../../constants/constants';

interface Props {
  isAuthenticated: boolean;
  url: string;
  reverse?: boolean;
}

function withRedirectRoute<T extends Props>(Component, url = ROUTES.HOME, reverse = true) {
  const WithRedirectRoute: React.FunctionComponent<Props> = (props) => {
    if (props.isAuthenticated) {
      return reverse ? <Redirect to={url} /> : <Component {...props} />;
    } else {
      return reverse ? <Component {...props} /> : <Redirect to={url} />;
    }
  };

  return WithRedirectRoute;
}

const mapStateToProps = (state: object) => ({
  isAuthenticated: getAuthorizationStatus(state),
});

export default compose(connect(mapStateToProps), withRedirectRoute);
