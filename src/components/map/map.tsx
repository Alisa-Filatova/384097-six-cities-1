import * as React from 'react';
import leaflet from 'leaflet';
import { City, Offer } from '../../types/offer';

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

interface Props {
  activeOfferId: number;
  currentCity: City;
  cityOffers: Offer[];
  zoom?: boolean;
  className?: string;
}

class Map extends React.PureComponent<Props> {

  map: any;
  markersLayer: any;

  componentDidMount() {
    this._initMap();
  }

  componentDidUpdate(prevProps) {
    const {zoom, activeOfferId} = this.props;

    if (this.map && this.markersLayer && prevProps.activeOfferId !== activeOfferId) {
      const {location} = this.props.currentCity;
      const center = [location.latitude, location.longitude];

      this.map.panTo(center);
      this.markersLayer.clearLayers();

      this.props.cityOffers.forEach((place) => {
        leaflet.marker([place.location.latitude, place.location.longitude],
            {icon: activeOfferId === place.id ? activePin : pin}).addTo(this.markersLayer);

        if (zoom && activeOfferId === place.id && prevProps.activeOfferId !== activeOfferId) {
          this.map.flyTo([place.location.latitude, place.location.longitude], place.location.zoom);
        }
      });
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const {className} = this.props;
    return (
      <section
        className={className ? className : `cities__map map`}
        id="map"
      />
    );
  }

  _initMap() {
    const {cityOffers, currentCity, activeOfferId} = this.props;

    if (!cityOffers.length) {
      return;
    }

    const {location} = currentCity;
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

    cityOffers.forEach((place) => {
      leaflet.marker([place.location.latitude, place.location.longitude],
          {icon: activeOfferId === place.id ? activePin : pin}).addTo(this.markersLayer);
    });
  }
}

export default Map;
