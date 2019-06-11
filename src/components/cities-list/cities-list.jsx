import React from 'react';
import PropTypes from 'prop-types';

const MAX_CITIES = 6;

// TODO
const getCities = (offers) => {
  const cities = offers.map((offer) => offer.city).sort((a, b) => {
    const textA = a.name.toUpperCase();
    const textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });

  return cities.reduce((prev, current) => {
    if (!prev.includes(current) && prev.length < MAX_CITIES) {
      prev.push(current);
    }
    return prev;
  }, []);
};

const CitiesList = ({offers, onCityClick, currentCity}) => {
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
                className={`locations__item-link tabs__item ${city.name === currentCity.name ? `tabs__item--active` : ``}`}
                onClick={() => onCityClick(city)}
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


CitiesList.propTypes = {
  offers: PropTypes.array.isRequired,
  onCityClick: PropTypes.func.isRequired,
  currentCity: PropTypes.object.isRequired,
};

export default CitiesList;
