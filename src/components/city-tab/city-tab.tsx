import * as React from 'react';

interface Props {
  city: string;
  onCityClick?: () => void;
  isActive?: boolean;
}

const CityTab: React.FunctionComponent<Props> = ({city, onCityClick, isActive}) => {
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

export default CityTab;
