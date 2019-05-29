import React from 'react';
import PropTypes from 'prop-types';

const TownsList = ({towns, onTownClick, currentTown}) => {
  return (
    <div className="cities tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {towns.map((town) => (
            <li
              className="locations__item"
              key={town}
            >
              <a
                className={`locations__item-link tabs__item ${town === currentTown ? `tabs__item--active` : ``}`}
                onClick={(event) => {
                  event.preventDefault();
                  onTownClick(town);
                }}
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
  towns: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTownClick: PropTypes.func.isRequired,
  currentTown: PropTypes.string.isRequired,
};

export default TownsList;
