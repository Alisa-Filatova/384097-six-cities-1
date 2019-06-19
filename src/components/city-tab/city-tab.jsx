import React from 'react';
import PropTypes from 'prop-types';

const CityTab = ({city, onCityClick, isActive}) => {
  return (
    <div className="locations__item">
      <a
        className={`locations__item-link tabs__item ${isActive ? `tabs__item--active` : ``}`}
        onClick={(event) => {
          event.preventDefault();
          onCityClick();
        }}
        href="#"
      >
        <span>{city}</span>
      </a>
    </div>
  );
};

CityTab.propTypes = {
  city: PropTypes.string,
  onCityClick: PropTypes.func,
  isActive: PropTypes.bool,
};

export default CityTab;
