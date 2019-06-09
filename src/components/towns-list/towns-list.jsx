import React from 'react';
import PropTypes from 'prop-types';

const MAX_CITIES = 6;

// TODO
const getCities = (offers) => {
  return offers.map((offer) => offer.city).reduce((acc, city) => {
    if (acc.length < MAX_CITIES && !acc.includes(city.name)) {
      acc.push(city);
    }
    return acc;
  }, []);
};

const TownsList = ({offers, onTownClick, currentTown}) => {
  const cities = getCities(offers);

  return (
    <div className="cities tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city, idx) => (
            <li
              className="locations__item"
              key={city.name + idx}
            >
              <a
                className={`locations__item-link tabs__item ${city.name === currentTown.name ? `tabs__item--active` : ``}`}
                onClick={() => onTownClick(city)}
                href="#"
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};


TownsList.propTypes = {
  offers: PropTypes.array.isRequired,
  onTownClick: PropTypes.func.isRequired,
  currentTown: PropTypes.object.isRequired,
};

export default TownsList;
