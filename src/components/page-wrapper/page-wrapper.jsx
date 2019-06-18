import React from 'react';
import PropTypes from 'prop-types';
import {ROUTES} from '../../constants/constants';

const getPageClassName = (page) => {
  switch (page) {
    case ROUTES.HOME: return `page page--gray page--main`;
    case ROUTES.LOGIN: return `page page--gray page--login`;
    default: return `page`;
  }
};

const PageWrapper = ({children, location}) => (
  <div className={getPageClassName(location)}>{children}</div>
);

export default PageWrapper;

PageWrapper.propTypes = {
  children: PropTypes.node,
  location: PropTypes.string,
};
