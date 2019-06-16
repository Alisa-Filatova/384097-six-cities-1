import React from 'react';
import PropTypes from 'prop-types';

const FavoriteButton = ({isActive, onClick, large}) => (
  <button
    className={`place-card__bookmark-button button ${isActive ? `place-card__bookmark-button--active` : ``}`}
    type="button"
    onClick={onClick}
  >
    <svg
      className="place-card__bookmark-icon"
      width={large ? 31 : 18} height={large ? 33 : 19}
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
