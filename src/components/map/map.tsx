import * as React from 'react';
import * as leaflet from 'leaflet';
import {City, Offer} from '../../types/offer';

const pin = leaflet.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
});

const activePin = leaflet.icon({
  iconUrl: '/img/pin-active.svg',
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
    this.initMap();
  }

  componentDidUpdate(prevProps) {
    const {zoom, activeOfferId, cityOffers} = this.props;

    if (this.map && this.markersLayer && prevProps.activeOfferId !== activeOfferId) {
      const {location} = this.props.currentCity;
      const center = [location.latitude, location.longitude];

      this.map.panTo(center);
      this.markersLayer.clearLayers();

      cityOffers.forEach((place) => {
        this.drawCityMarker(place, activeOfferId);

        if (zoom && activeOfferId === place.id && prevProps.activeOfferId !== activeOfferId) {
          const coordinates = [
            place.location.latitude,
            place.location.longitude,
          ];

          this.map.flyTo(coordinates, place.location.zoom);
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
        className={className ? className : 'cities__map map'}
        id="map"
      />
    );
  }

  private initMap = () => {
    const {cityOffers, currentCity, activeOfferId} = this.props;

    if (!cityOffers.length) {
      return;
    }

    const {location} = currentCity;
    const center = [location.latitude, location.longitude];

    this.map = leaflet
      .map('map', {
        zoom: location.zoom,
        zoomControl: false,
        marker: true,
        icon: pin,
      })
      .setView(center, location.zoom);

    leaflet
      .tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png')
      .addTo(this.map);

    this.markersLayer = leaflet.layerGroup().addTo(this.map);

    cityOffers.forEach((city) => this.drawCityMarker(city, activeOfferId));
  };

  private drawCityMarker = (place: Offer, activeOfferId: number) => {
    const coordinates = [
      place.location.latitude,
      place.location.longitude,
    ];

    const options = {
      icon: activeOfferId === place.id ? activePin : pin,
    };

    leaflet
      .marker(coordinates, options)
      .addTo(this.markersLayer);
  }
}

export default Map;
