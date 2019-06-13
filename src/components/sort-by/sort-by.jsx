import React from 'react';
import PropTypes from 'prop-types';

const SortBy = ({onToggle, isOpen = false, currentItem = `Popular`, onPopularClick, onLowToHighClick, onHighToLowClick, onTopRatedClick}) => {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0" onClick={onToggle}>
        {currentItem}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      {isOpen &&
        <ul className="places__options places__options--custom places__options--opened">
          <li
            className="places__option places__option--active"
            tabIndex="0"
            onClick={onPopularClick}
          >
            Popular
          </li>
          <li
            className="places__option"
            tabIndex="0"
            onClick={onLowToHighClick}
          >
            Price: low to high
          </li>
          <li
            className="places__option"
            tabIndex="0"
            onClick={onHighToLowClick}
          >
            Price: high to low
          </li>
          <li
            className="places__option"
            tabIndex="0"
            onClick={onTopRatedClick}
          >
            Top rated first
          </li>
        </ul>
      }
    </form>
  );
};

SortBy.propTypes = {
  onToggle: PropTypes.func,
  isOpen: PropTypes.bool,
  currentItem: PropTypes.string,
  onPopularClick: PropTypes.func,
  onLowToHighClick: PropTypes.func,
  onHighToLowClick: PropTypes.func,
  onTopRatedClick: PropTypes.func,
};

export default SortBy;
