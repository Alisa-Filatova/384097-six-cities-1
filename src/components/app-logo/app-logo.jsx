import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {ROUTES} from '../../constants/constants';

const LogoSize = {
  DEFAULT: {
    width: 81,
    height: 41,
  },
  SMALL: {
    width: 64,
    height: 33,
  },
};

const AppLogo = ({prefix = `header`, small}) => (
  <Link
    className={`${prefix}__logo-link`}
    to={ROUTES.HOME}
  >
    <img
      className={`${prefix}__logo`}
      src="/img/logo.svg"
      alt="6 cities logo"
      width={small ? LogoSize.SMALL.width : LogoSize.DEFAULT.width}
      height={small ? LogoSize.SMALL.height : LogoSize.DEFAULT.height}
    />
  </Link>
);

export default AppLogo;

AppLogo.propTypes = {
  prefix: PropTypes.string,
  small: PropTypes.bool,
};
