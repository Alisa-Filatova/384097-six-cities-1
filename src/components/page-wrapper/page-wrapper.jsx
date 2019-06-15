import React from 'react';
import PropTypes from 'prop-types';

const PageWrapper = ({children, pageType}) => (
  <div className={`page page--gray page--${pageType}`}>{children}</div>
);

export default PageWrapper;

PageWrapper.propTypes = {
  children: PropTypes.node,
  pageType: PropTypes.string,
};
