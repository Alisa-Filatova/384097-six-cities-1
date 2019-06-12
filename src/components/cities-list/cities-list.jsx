import React from 'react';
import PropTypes from 'prop-types';

const CitiesList = ({cities, onCityClick, currentCity}) => (
  <div className="cities tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li
            className="locations__item"
            key={city.name}
          >
            <a
              className={`locations__item-link tabs__item ${city.name === currentCity.name ? `tabs__item--active` : ``}`}
              onClick={(event) => {
                event.preventDefault();
                onCityClick(city);
              }}
              href=""
            >
              <span>{city.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCityClick: PropTypes.func.isRequired,
  currentCity: PropTypes.object.isRequired,
};

export default CitiesList;
