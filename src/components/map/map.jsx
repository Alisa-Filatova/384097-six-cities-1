import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

const ZOOM = 12;

const SETTINGS = {
  zoom: ZOOM,
  zoomControl: false,
  marker: true,
  icon: leaflet.icon({
    iconUrl: `img/pin.svg`,
    iconSize: [27, 39],
  }),
};

class Map extends React.PureComponent {

  componentDidMount() {
    this._initMap();
  }

  componentDidUpdate() {
    if (this.map && this.markersLayer) {
      const {town, rentalOffers} = this.props;
      const center = town.coordinates;

      this.map.panTo(center);
      this.markersLayer.clearLayers();

      rentalOffers.forEach((place) => {
        leaflet.marker(place.coordinates, {icon: SETTINGS.icon}).addTo(this.markersLayer);
      });
    }
  }

  componentWillUnmount() {
    this.map.remove();
    this.map = null;
  }

  render() {
    return (
      <section
        className="cities__map map"
        id="map"
      />
    );
  }

  _initMap() {
    const {town, rentalOffers} = this.props;
    this.map = leaflet.map(`map`, SETTINGS);

    this.map.setView(town.coordinates, SETTINGS.zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`)
      .addTo(this.map);

    this.markersLayer = leaflet.layerGroup().addTo(this.map);

    rentalOffers.forEach((place) => {
      leaflet.marker(place.coordinates, {icon: SETTINGS.icon}).addTo(this.markersLayer);
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
    town: PropTypes.shape({
      name: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
  })).isRequired,
  town: PropTypes.shape({
    name: PropTypes.string,
    coordinates: PropTypes.arrayOf(PropTypes.number),
  }),
};

export default Map;
