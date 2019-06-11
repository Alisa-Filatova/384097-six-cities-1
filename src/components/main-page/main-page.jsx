import React from 'react';
import PropTypes from 'prop-types';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import withActiveItem from '../../hocs/with-active-item.jsx';
import withTransformProps from '../../hocs/with-transform-props.jsx';

const WrappedOffersList = withActiveItem(
    withTransformProps((props) => Object.assign({}, props, {
      setActiveItem: props.setActiveItem,
    }))(OffersList)
);

class MainPage extends React.Component {
  render() {
    const {rentalOffers, onCityClick, currentCity, cityOffers, activeOfferId, setActiveItem} = this.props;

    return (
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          offers={rentalOffers}
          currentCity={currentCity}
          onCityClick={onCityClick}
        />
        <div className="cities__places-wrapper" style={{height: `100vh`}}>
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {`${cityOffers.length} ${cityOffers.length === 1 ? `place` : `places`} to stay in ${currentCity.name}`}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"/>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>
              <WrappedOffersList
                rentalOffers={cityOffers}
                setActiveItem={setActiveItem}
              />
            </section>
            <div className="cities__right-section">
              <Map
                key={currentCity.name}
                currentCity={currentCity}
                activeOfferId={activeOfferId}
                cityOffers={cityOffers}
              />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

MainPage.propTypes = {
  rentalOffers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    [`preview_image`]: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    [`is_premium`]: PropTypes.bool,
    [`is_favorite`]: PropTypes.bool,
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
  currentCity: PropTypes.object.isRequired,
  onCityClick: PropTypes.func.isRequired,
  cityOffers: PropTypes.array.isRequired,
  activeOfferId: PropTypes.any,
  setActiveItem: PropTypes.func,
};

export default MainPage;
