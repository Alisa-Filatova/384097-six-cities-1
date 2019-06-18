import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from '../../constants/constants';

const AppFooter = () => (
  <footer className="footer container">
    <Link className="footer__logo-link" to={ROUTES.HOME}>
      <img
        className="footer__logo"
        src="/img/logo.svg"
        alt="6 cities logo"
        width="64"
        height="33"
      />
    </Link>
  </footer>
);

export default AppFooter;
