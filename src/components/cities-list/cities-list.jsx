import React from 'react';
import PropTypes from 'prop-types';
import CityTab from '../city-tab/city-tab.jsx';

const CitiesList = ({cities, onCityClick, currentCity}) => (
  <div className="cities tabs">
    <section className="locations container">
      <div className="locations__list tabs__list">
        {cities.map((city) => (
          <CityTab
            key={city.name}
            city={city}
            onCityClick={onCityClick}
            isActive={city.name === currentCity.name}
          />
        ))}
      </div>
    </section>
  </div>
);

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCityClick: PropTypes.func.isRequired,
  currentCity: PropTypes.object.isRequired,
};

export default CitiesList;
