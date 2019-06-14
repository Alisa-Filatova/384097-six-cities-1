import React from 'react';
import PropTypes from 'prop-types';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import SortBy from '../sort-by/sort-by.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import withTransformProps from '../../hocs/with-transform-props/with-transform-props.jsx';
import withToggle from '../../hocs/with-toggle/with-toggle.jsx';

const WrappedOffersList = withActiveItem(OffersList);
const WrappedSortBy = withToggle(withActiveItem(
    withTransformProps((props) => Object.assign({}, props, {
      isOpen: props.toggleStatus,
    }))(SortBy)
));

const MainPage = ({
  onCityClick,
  currentCity,
  cityOffers,
  activeOfferId,
  setActiveItem,
  cities,
  onOfferTitleClick,
  onLowToHighClick,
  onHighToLowClick,
  onTopRatedClick,
  onPopularClick,
  setActiveFilter,
}) => (
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
          <WrappedSortBy
            onLowToHighClick={onLowToHighClick}
            onHighToLowClick={onHighToLowClick}
            onTopRatedClick={onTopRatedClick}
            onPopularClick={onPopularClick}
            setActiveItem={setActiveFilter}
          />
          <WrappedOffersList
            rentalOffers={cityOffers}
            setActiveItem={setActiveItem}
            onOfferTitleClick={onOfferTitleClick}
          />
        </section>
        <div className="cities__right-section">
          <Map
            key={currentCity.name}
            currentCity={currentCity}
            activeOfferId={activeOfferId}
            cityOffers={cityOffers}
            zoom
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
  setActiveFilter: PropTypes.func,
  onOfferTitleClick: PropTypes.func,
  onLowToHighClick: PropTypes.func,
  onHighToLowClick: PropTypes.func,
  onTopRatedClick: PropTypes.func,
  onPopularClick: PropTypes.func,
};

export default MainPage;
