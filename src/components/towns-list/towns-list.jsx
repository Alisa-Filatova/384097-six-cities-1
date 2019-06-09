import React from 'react';
import PropTypes from 'prop-types';

const MAX_CITIES = 6;

const getAvailableCities = (offers) => {
  return offers.map((offer) => offer.city.name).reduce((acc, city) => {
    if (acc.length < MAX_CITIES && !acc.includes(city)) {
      acc.push(city);
    }
    return acc;
  }, []);
};

const TownsList = ({offers, onTownClick, currentTown}) => {

  const availableCities = getAvailableCities(offers);

  return (
    <div className="cities tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {availableCities.map((town, idx) => (
            <li
              className="locations__item"
              key={town + idx}
            >
              <a
                className={`locations__item-link tabs__item ${town === currentTown ? `tabs__item--active` : ``}`}
                onClick={() => onTownClick(town)}
                href="#"
              >
                <span>{town}</span>
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
  currentTown: PropTypes.string.isRequired,
};

export default TownsList;
