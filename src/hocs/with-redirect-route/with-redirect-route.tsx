import * as React from 'react';
import {Redirect} from 'react-router-dom';

interface Props {
  isAuthenticated: boolean;
  url: string;
  reverse?: boolean;
}

const withRedirectRoute = (Component) => {
  const WithRedirectRoute: React.FunctionComponent<Props> = (props) => {
    if (props.isAuthenticated) {
      return props.reverse ? <Redirect to={props.url} /> : <Component {...props} />;
    } else {
      return props.reverse ? <Component {...props} /> : <Redirect to={props.url} />;
    }
  };

  return WithRedirectRoute;
};

export default withRedirectRoute;
