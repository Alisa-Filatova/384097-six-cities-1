import React from 'react';
import PropTypes from 'prop-types';

const IconSize = {
  DEFAULT: {
    width: 18,
    height: 19,
  },
  LARGE: {
    width: 31,
    height: 33,
  }
};

const FavoriteButton = ({isActive, onClick, large}) => (
  <button
    className={`place-card__bookmark-button button ${isActive ? `place-card__bookmark-button--active` : ``}`}
    type="button"
    onClick={onClick}
  >
    <svg
      className="place-card__bookmark-icon"
      width={large ? IconSize.LARGE.width : IconSize.DEFAULT.width}
      height={large ? IconSize.LARGE.height : IconSize.DEFAULT.height}
    >
      <use xlinkHref="#icon-bookmark" />
    </svg>
    <span className="visually-hidden">To bookmarks</span>
  </button>
);

FavoriteButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  large: PropTypes.bool,
};

export default FavoriteButton;
