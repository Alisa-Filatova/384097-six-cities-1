import * as React from 'react';
import CityTab from '../city-tab/city-tab.jsx';
import {City} from '../../types/offer';

interface Props {
  cities: City[];
  currentCity: City;
  onCityClick: (City) => void;
}

const CitiesList: React.FunctionComponent<Props> = ({cities, onCityClick, currentCity}) => (
  <div className="cities tabs">
    <section className="locations container">
      <div className="locations__list tabs__list">
        {cities.map((city) => (
          <CityTab
            key={city.name}
            city={city.name}
            onCityClick={() => onCityClick(city)}
            isActive={city.name === currentCity.name}
          />
        ))}
      </div>
    </section>
  </div>
);

export default CitiesList;
