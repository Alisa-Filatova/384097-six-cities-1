import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator, Operation} from '../../reducers/data/data';
import {
  getCurrentCity,
  getCities,
  getOffersLoadStatus,
  getSortValue,
  sortOffers, getOfferById,
} from '../../reducers/data/selectors';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import SortBy from '../sort-by/sort-by.jsx';
import MainPageEmpty from '../main-page-empty/main-page-empty.jsx';
import Loader from '../loader/loader.jsx';
import {SortType} from '../../types/sort-type';
import {getAuthorizationStatus} from '../../reducers/user/selectors';
import withActiveOfferId from '../../hocs/with-active-offer-id/with-active-offer-id.jsx';
import withTransformProps from '../../hocs/with-transform-props/with-transform-props.jsx';

const MainPage = (props) => {
  const {
    onCityClick,
    currentCity,
    cityOffers,
    cities,
    offersLoaded,
    onPopularClick,
    onLowToHighClick,
    onHighToLowClick,
    onTopRatedClick,
    onFavoriteClick,
    sortValue,
    isAuthenticated,
    history,
    onImgClick,
    activeOfferId,
  } = props;

  return (
    <>
      <main className={`page__main page__main--index ${cityOffers.length === 0 ? `page__main--index-empty` : ``}`}>
        {!offersLoaded && <Loader />}
        {offersLoaded && cityOffers.length > 0 && (
          <>
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
                  <SortBy
                    currentItem={sortValue}
                    onPopularClick={onPopularClick}
                    onLowToHighClick={onLowToHighClick}
                    onHighToLowClick={onHighToLowClick}
                    onTopRatedClick={onTopRatedClick}
                  />
                  <OffersList
                    rentalOffers={cityOffers}
                    onImgClick={onImgClick}
                    history={history}
                    onFavoriteClick={onFavoriteClick}
                    isAuthenticated={isAuthenticated}
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
          </>
        )}
        {offersLoaded && cityOffers.length === 0 && (
          <MainPageEmpty currentCity={currentCity} />
        )}
      </main>
    </>
  );
};

MainPage.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentCity: PropTypes.object.isRequired,
  onCityClick: PropTypes.func.isRequired,
  cityOffers: PropTypes.array.isRequired,
  onPopularClick: PropTypes.func.isRequired,
  onLowToHighClick: PropTypes.func.isRequired,
  onHighToLowClick: PropTypes.func.isRequired,
  onTopRatedClick: PropTypes.func.isRequired,
  offersLoaded: PropTypes.bool.isRequired,
  sortValue: PropTypes.string,
  history: PropTypes.any,
  onFavoriteClick: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  offer: PropTypes.object,
  activeOfferId: PropTypes.number,
  onImgClick: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentCity: getCurrentCity(state),
  cityOffers: sortOffers(state),
  cities: getCities(state),
  offersLoaded: getOffersLoadStatus(state),
  sortValue: getSortValue(state),
  offer: getOfferById(state, ownProps.activeOfferId),
  isAuthenticated: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (currentCity) => {
    dispatch(ActionCreator.changeCity(currentCity));
  },
  onPopularClick: () => {
    dispatch(ActionCreator.sortOffers(SortType.POPULAR));
  },
  onLowToHighClick: () => {
    dispatch(ActionCreator.sortOffers(SortType.LOW_TO_HIGH));
  },
  onHighToLowClick: () => {
    dispatch(ActionCreator.sortOffers(SortType.HIGH_TO_LOW));
  },
  onTopRatedClick: () => {
    dispatch(ActionCreator.sortOffers(SortType.TOP_RATED));
  },
  onFavoriteClick: (offer) => {
    dispatch(Operation.changeFavorites(offer));
  },
});

export {MainPage};
export default withActiveOfferId(
    withTransformProps((props) => Object.assign({}, props, {
      onImgClick: props.setActiveId,
    })
    )(connect(mapStateToProps, mapDispatchToProps)(MainPage))
);
