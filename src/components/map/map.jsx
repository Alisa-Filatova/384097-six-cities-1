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
  constructor(props) {
    super(props);
    this._mapRef = React.createRef();
  }

  componentDidMount() {
    this._initMap();
  }

  componentDidUpdate() {
    if (!this._initialized) {
      this._initMap();
    }
    this._addMarkersOnMap();
  }

  componentWillUnmount() {
    this.map.remove();
    this.map = null;
  }

  render() {
    return (
      <section
        className="cities__map map"
        ref={this._mapRef}
      />
    );
  }

  _initMap() {
    if (!this.props.cityOffers.length) {
      return;
    }

    const {cityLocation} = this.props.cityOffers[0];
    const city = [cityLocation.latitude, cityLocation.longitude];
    const zoom = cityLocation.zoom;
    this._map = leaflet.map(this._mapRef.current, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    this._map.setView(city, zoom);

    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      updateWhenIdle: true,
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this._map);

    this._icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [27, 39]
    });

    this._activeIcon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [27, 39]
    });
    this._addMarkersOnMap();

    this._initialized = true;
  }

  _addMarkersOnMap() {
    if (!this._markers) {
      this._markers = new Map();
    } else {
      this._markers.forEach((offerId, marker) => {
        if (this.props.activeOfferId === offerId) {
          marker.setIcon(this._activeIcon);
        } else {
          marker.setIcon(this._icon);
        }
      });
      return;
    }

    this.props.cityOffers.forEach(({id, location}) => {
      const loc = [location.latitude, location.longitude];
      const marker = leaflet.marker(loc, {
        icon: id === this.props.activeOfferId ? this._activeIcon : this._icon
      });
      this._markers.set(marker, id);
      marker.addTo(this._map);
    });
  }
}

Map.propTypes = {
  cityOffers: PropTypes.array.isRequired,
  activeOfferId: PropTypes.any,
};

export default Map;
