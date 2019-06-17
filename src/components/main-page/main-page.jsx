import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import SortBy from '../sort-by/sort-by.jsx';
import MainPageEmpty from '../main-page-empty/main-page-empty.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import withTransformProps from '../../hocs/with-transform-props/with-transform-props.jsx';
import withToggle from '../../hocs/with-toggle/with-toggle.jsx';
import {
  sortOffersByLowToHigh,
  sortOffersByHighToLow,
  sortOffersByRating,
  sortOffersById, getCurrentCity, getOffers, getCityOffers, getCities, getFavoriteOffers,
} from '../../reducers/data/selectors';

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
  setActiveFilter,
  currentFilter,
  onPopularClick,
  onLowToHighClick,
  onHighToLowClick,
  onTopRatedClick,
}) => (
  <main className={`page__main page__main--index ${cityOffers.length <= 0 ? `page__main--index-empty` : ``}`}>
    <h1 className="visually-hidden">Cities</h1>
    <CitiesList
      cities={cities}
      currentCity={currentCity}
      onCityClick={onCityClick}
    />
    {cityOffers.length > 0 ?
      <div className="cities__places-wrapper" style={{height: `100vh`}}>
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {`${cityOffers.length} ${cityOffers.length === 1 ? `place` : `places`} to stay in ${currentCity.name}`}
            </b>
            <WrappedSortBy
              offers={cityOffers}
              setActiveItem={setActiveFilter}
              currentItem={currentFilter}
              onPopularClick={onPopularClick}
              onLowToHighClick={onLowToHighClick}
              onHighToLowClick={onHighToLowClick}
              onTopRatedClick={onTopRatedClick}
            />
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
              zoom
            />
          </div>
        </div>
      </div>
      :
      <MainPageEmpty currentCity={currentCity} />
    }
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
  currentFilter: PropTypes.any,
  onPopularClick: PropTypes.func,
  onLowToHighClick: PropTypes.func,
  onHighToLowClick: PropTypes.func,
  onTopRatedClick: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentCity: getCurrentCity(state),
  rentalOffers: getOffers(state),
  cityOffers: getCityOffers(state),
  cities: getCities(state),
});

const mapDispatchToProps = (ownProps) => ({
  onPopularClick: (cityOffers) => {
    dispatch(sortOffersById(cityOffers));
  },
  onLowToHighClick: (rentalOffers) => {
    dispatch(sortOffersByLowToHigh(rentalOffers));
  },
  onHighToLowClick: (cityOffers) => {
    dispatch(sortOffersByHighToLow(cityOffers));
  },
  onTopRatedClick: (cityOffers) => {
    dispatch(sortOffersByRating(cityOffers));
  },
});

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
