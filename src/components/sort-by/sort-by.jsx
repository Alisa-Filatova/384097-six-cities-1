import React from 'react';
import PropTypes from 'prop-types';

const SortBy = (
    {
      onToggle,
      isOpen,
      onPopularClick,
      onLowToHighClick,
      onHighToLowClick,
      onTopRatedClick,
      activeItem,
    }
) => {

  const SORT_TYPES_LIST = [
    {
      name: `Popular`,
      action: onPopularClick,
    },
    {
      name: `Price: low to high`,
      action: onLowToHighClick,
    },
    {
      name: `Price: high to low`,
      action: onHighToLowClick,
    },
    {
      name: `Top rated first`,
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
        <span className="places__sorting-caption">Sort by</span>
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      {isOpen &&
        <ul className="places__options places__options--custom places__options--opened">
          {SORT_TYPES_LIST.map((item) =>
            <li
              className={`places__option ${activeItem === item.name ? `places__option--active` : ``}`}
              tabIndex="0"
              onMouseOver={() => item.name}
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
  activeItem: PropTypes.any,
  onPopularClick: PropTypes.func,
  onLowToHighClick: PropTypes.func,
  onHighToLowClick: PropTypes.func,
  onTopRatedClick: PropTypes.func,
};

export default SortBy;
