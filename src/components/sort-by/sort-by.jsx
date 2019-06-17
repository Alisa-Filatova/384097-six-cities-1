import React from 'react';
import PropTypes from 'prop-types';
import {SortType} from '../../types/sort-type';

const SortBy = (props) => {
  const {
    onToggle,
    isOpen,
    onPopularClick,
    onLowToHighClick,
    onHighToLowClick,
    onTopRatedClick,
    currentItem,
    setActiveItem
  } = props;

  const SORT_TYPES_LIST = [
    {
      name: SortType.POPULAR,
      action: onPopularClick,
    },
    {
      name: SortType.LOW_TO_HIGH,
      action: onLowToHighClick,
    },
    {
      name: SortType.HIGH_TO_LOW,
      action: onHighToLowClick,
    },
    {
      name: SortType.TOP_RATED,
      action: onTopRatedClick,
    },
  ];

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onClick={onToggle}
    >
      <span className="places__sorting-type" tabIndex="0" >
        <span className="places__sorting-caption">Sort by</span> {currentItem}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      {isOpen &&
        <ul className="places__options places__options--custom places__options--opened">
          {SORT_TYPES_LIST.map((item) =>
            <li
              className={`places__option ${currentItem === item.name ? `places__option--active` : ``}`}
              tabIndex="0"
              onMouseOver={() => setActiveItem(item.name)}
              onClick={item.action}
              key={item.name}
            >
              {item.name}
            </li>
          )}
        </ul>
      }
    </form>
  );
};

SortBy.propTypes = {
  onToggle: PropTypes.func,
  isOpen: PropTypes.bool,
  currentItem: PropTypes.any,
  onPopularClick: PropTypes.func,
  onLowToHighClick: PropTypes.func,
  onHighToLowClick: PropTypes.func,
  onTopRatedClick: PropTypes.func,
  setActiveItem: PropTypes.func,
};

export default SortBy;
