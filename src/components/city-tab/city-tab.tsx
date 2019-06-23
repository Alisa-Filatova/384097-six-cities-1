import * as React from 'react';

interface Props {
  city: string;
  onCityClick?: () => void;
  isActive?: boolean;
}

class CityTab extends React.PureComponent<Props> {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const {city, onCityClick, isActive} = this.props;

    return (
      <div className="locations__item">
        <a
          style={{pointerEvents: onCityClick ? `auto` : `none`}}
          className={`locations__item-link tabs__item ${isActive ? `tabs__item--active` : ``}`}
          onClick={this.handleClick}
          href="#"
        >
          <span>{city}</span>
        </a>
      </div>
    );
  }

  private handleClick(event) {
    event.preventDefault();
    this.props.onCityClick();
  }
}

export default CityTab;
