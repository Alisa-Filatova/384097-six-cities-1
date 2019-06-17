import React from 'react';
import PropTypes from 'prop-types';

const CityTab = ({city, onCityClick, isActive}) => (
  <div className="locations__item">
    <a
      className={`locations__item-link tabs__item ${isActive ? `tabs__item--active` : ``}`}
      onClick={(event) => {
        event.preventDefault();
        onCityClick(city);
      }}
      href=""
    >
      <span>{city.name}</span>
    </a>
  </div>
);

CityTab.propTypes = {
  city: PropTypes.object,
  onCityClick: PropTypes.func,
  isActive: PropTypes.bool,
};

export default CityTab;
