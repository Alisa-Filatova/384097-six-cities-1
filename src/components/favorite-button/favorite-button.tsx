import * as React from 'react';

const iconSize = {
  DEFAULT: {
    width: 18,
    height: 19,
  },
  LARGE: {
    width: 31,
    height: 33,
  }
};

interface Props {
  onClick: () => void;
  isActive?: boolean;
  large?: boolean;
}

const FavoriteButton: React.FunctionComponent<Props> = ({isActive, onClick, large}) => (
  <button
    className={`place-card__bookmark-button button ${isActive ? `place-card__bookmark-button--active` : ``}`}
    type="button"
    onClick={onClick}
  >
    <svg
      className="place-card__bookmark-icon"
      width={large ? iconSize.LARGE.width : iconSize.DEFAULT.width}
      height={large ? iconSize.LARGE.height : iconSize.DEFAULT.height}
    >
      <use xlinkHref="#icon-bookmark" />
    </svg>
    <span className="visually-hidden">To bookmarks</span>
  </button>
);

export default FavoriteButton;
