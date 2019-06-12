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

const MainPage = ({onCityClick, currentCity, cityOffers, activeOfferId, setActiveItem, cities}) => (
  <main className="page__main page__main--index">
    <h1 className="visually-hidden">Cities</h1>
    <CitiesList
      cities={cities}
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

MainPage.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.object),
  currentCity: PropTypes.object.isRequired,
  onCityClick: PropTypes.func.isRequired,
  cityOffers: PropTypes.array.isRequired,
  activeOfferId: PropTypes.any,
  setActiveItem: PropTypes.func,
};

export default MainPage;
