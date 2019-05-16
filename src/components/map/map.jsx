import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

const DEFAULT_CITY = [52.38333, 4.9];
const ZOOM = 12;

const SETTINGS = {
  center: DEFAULT_CITY,
  zoom: ZOOM,
  zoomControl: false,
  marker: true,
  icon: leaflet.icon({
    iconUrl: `img/pin.svg`,
    iconSize: [27, 39],
  })
};

class Map extends React.PureComponent {
  render() {
    return (
      <section
        className="cities__map map"
        id="map"
      />
    );
  }

  componentDidMount() {
    this._initMap();
  }

  _initMap() {
    const map = leaflet.map(`map`, SETTINGS);

    map.setView(SETTINGS.center, SETTINGS.zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`)
      .addTo(map);

    this.props.rentalOffers.forEach((offer) => {
      leaflet.marker(offer.coordinates, {icon: SETTINGS.icon}).addTo(map);
    });
  }
}

Map.propTypes = {
  rentalOffers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    img: PropTypes.string,
    isPremium: PropTypes.bool,
    price: PropTypes.number,
    stars: PropTypes.number,
    type: PropTypes.string,
    isInBookmarks: PropTypes.bool,
    coordinates: PropTypes.arrayOf(PropTypes.number),
  })).isRequired,
};

export default Map;
