import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

const pin =
  leaflet.icon({
    iconUrl: `/img/pin.svg`,
    iconSize: [27, 39],
  });

const activePin =
  leaflet.icon({
    iconUrl: `/img/pin-active.svg`,
    iconSize: [30, 42],
  });

class Map extends React.PureComponent {

  componentDidMount() {
    this._initMap();
  }

  componentDidUpdate() {
    const {zoom, activeOfferId} = this.props;

    if (this.map && this.markersLayer) {
      const {location} = this.props.currentCity;
      const center = [location.latitude, location.longitude];

      this.map.panTo(center);
      this.markersLayer.clearLayers();

      this.props.cityOffers.forEach((place) => {
        leaflet.marker([place.location.latitude, place.location.longitude],
            {icon: activeOfferId === place.id ? activePin : pin}).addTo(this.markersLayer);

        if (zoom && activeOfferId === place.id) {
          this.map.flyTo([place.location.latitude, place.location.longitude], place.location.zoom);
        }
      });
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <section
        className={this.props.className ? this.props.className : `cities__map map`}
        id="map"
      />
    );
  }

  _initMap() {
    if (!this.props.cityOffers.length) {
      return;
    }

    const {location} = this.props.currentCity;
    const center = [location.latitude, location.longitude];

    this.map = leaflet.map(`map`, {
      zoom: location.zoom,
      zoomControl: false,
      marker: true,
      icon: pin,
    });

    this.map.setView(center, location.zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`)
      .addTo(this.map);

    this.markersLayer = leaflet.layerGroup().addTo(this.map);

    this.props.cityOffers.forEach((place) => {
      leaflet.marker([place.location.latitude, place.location.longitude],
          {icon: this.props.activeOfferId === place.id ? activePin : pin}).addTo(this.markersLayer);
    });
  }
}

Map.propTypes = {
  cityOffers: PropTypes.array,
  activeOfferId: PropTypes.any,
  currentCity: PropTypes.object,
  zoom: PropTypes.bool,
  className: PropTypes.string,
};

export default Map;
