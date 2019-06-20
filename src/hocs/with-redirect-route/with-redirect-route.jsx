import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const withRedirectRoute = (Component, isAuthenticated, url, reverse) => {
  const WithRedirectRoute = (props) => {
    if (isAuthenticated) {
      return reverse ? <Redirect to={url} /> : <Component {...props} />;
    } else {
      return reverse ? <Component {...props} /> : <Redirect to={url} />;
    }
  };

  WithRedirectRoute.propTypes = {
    isAuthenticated: PropTypes.bool,
    url: PropTypes.string,
    reverse: PropTypes.bool,
  };

  return WithRedirectRoute;
};

export default withRedirectRoute;
