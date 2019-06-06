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
      const {city, rentalOffers} = this.props;
      const center = [city.location.latitude, city.location.longitude];

      this.map.panTo(center);
      this.markersLayer.clearLayers();

      rentalOffers.forEach((place) => {
        leaflet.marker([place.location.latitude, place.location.longitude], {icon: SETTINGS.icon}).addTo(this.markersLayer);
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
    const {city, rentalOffers} = this.props;
    this.map = leaflet.map(`map`, SETTINGS);

    this.map.setView([city.location.latitude, city.location.longitude], city.location.zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`)
      .addTo(this.map);

    this.markersLayer = leaflet.layerGroup().addTo(this.map);

    rentalOffers.forEach((place) => {
      leaflet.marker([place.location.latitude, place.location.longitude], {icon: SETTINGS.icon}).addTo(this.markersLayer);
    });
  }
}

Map.propTypes = {
  rentalOffers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    [`preview_image`]: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    [`is_premium`]: PropTypes.bool,
    [`is_favourite`]: PropTypes.bool,
    bedrooms: PropTypes.number,
    goods: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    type: PropTypes.string,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number,
    }),
    city: PropTypes.shape({
      name: PropTypes.string,
      location: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        zoom: PropTypes.number,
      }),
    }),
    host: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      [`is_pro`]: PropTypes.bool,
      [`avatar_url`]: PropTypes.string,
    }),
  })).isRequired,
  city: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number,
    }),
  }),
};

export default Map;
