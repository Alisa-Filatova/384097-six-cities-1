import * as React from 'react';
import * as leaflet from 'leaflet';
import {City, Offer} from '../../types/offer';

const pin = leaflet.icon({
  iconUrl: `/img/pin.svg`,
  iconSize: [27, 39],
});

const activePin = leaflet.icon({
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

  _map: any;
  _markersLayer: any;

  componentDidMount() {
    this._initMap();
  }

  componentDidUpdate(prevProps) {
    const {zoom, activeOfferId, cityOffers} = this.props;

    if (this._map && this._markersLayer && prevProps.activeOfferId !== activeOfferId) {
      const {location} = this.props.currentCity;
      const center = [location.latitude, location.longitude];

      this._map.panTo(center);
      this._markersLayer.clearLayers();

      cityOffers.forEach((place) => {
        this._drawCityMarker(place, activeOfferId);

        if (zoom && activeOfferId === place.id && prevProps.activeOfferId !== activeOfferId) {
          const coordinates = [
            place.location.latitude,
            place.location.longitude,
          ];

          this._map.flyTo(coordinates, place.location.zoom);
        }
      });
    }
  }

  componentWillUnmount() {
    this._map.remove();
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

  private _initMap() {
    const {cityOffers, currentCity, activeOfferId} = this.props;

    if (!cityOffers.length) {
      return;
    }

    const {location} = currentCity;
    const center = [location.latitude, location.longitude];

    this._map = leaflet
      .map(`map`, {
        zoom: location.zoom,
        zoomControl: false,
        marker: true,
        icon: pin,
      })
      .setView(center, location.zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`)
      .addTo(this._map);

    this._markersLayer = leaflet.layerGroup().addTo(this._map);

    cityOffers.forEach((city) => this._drawCityMarker(city, activeOfferId));
  }

  private _drawCityMarker(city, activeOfferId: number) {
    const coordinates = [
      city.location.latitude,
      city.location.longitude,
    ];

    const options = {
      icon: activeOfferId === city.id ? activePin : pin,
    };

    leaflet
      .marker(coordinates, options)
      .addTo(this._markersLayer);
  }
}

export default Map;
