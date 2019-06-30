import * as React from 'react';
import {connect} from 'react-redux';
import {ActionCreator, Operation} from '../../reducers/data/data';
import {
  getCurrentCity,
  getCities,
  getOffersLoadStatus,
  getSortValue,
  sortOffers,
  getOfferById,
} from '../../reducers/data/selectors';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';
import SortBy from '../sort-by/sort-by';
import MainPageEmpty from '../main-page-empty/main-page-empty';
import Loader from '../loader/loader';
import SortType from '../../types/enums/sort-type';
import {getAuthorizationStatus} from '../../reducers/user/selectors';
import withActiveOfferId from '../../hocs/with-active-offer-id/with-active-offer-id';
import withTransformProps from '../../hocs/with-transform-props/with-transform-props';
import {City, Offer} from '../../types/offer';

interface Props {
  cities: City[];
  currentCity: City;
  onCityClick: () => void;
  cityOffers: Offer[];
  onPopularClick: () => void;
  onLowToHighClick: () => void;
  onHighToLowClick: () => void;
  onTopRatedClick: () => void;
  onFavoriteClick: (Offer) => void;
  offersLoaded: boolean;
  sortValue: SortType;
  isAuthenticated: boolean,
  offer: Offer;
  activeOfferId: number;
  onPlaceClick?: () => void;
  history?: any[],
}

const MainPage: React.FunctionComponent<Props> = (props) => {
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
    onPlaceClick,
    activeOfferId,
  } = props;

  return (
    <main className={`page__main page__main--index ${cityOffers.length === 0 ? 'page__main--index-empty' : ''}`}>
      {!offersLoaded && <Loader />}
      {offersLoaded && cityOffers.length > 0 && (
        <>
          <h1 className="visually-hidden">Cities</h1>
          <CitiesList
            cities={cities}
            currentCity={currentCity}
            onCityClick={onCityClick}
          />
          <div className="cities__places-wrapper" style={{height: '100vh'}}>
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {`${cityOffers.length} ${cityOffers.length === 1 ? 'place' : 'places'} to stay in ${currentCity.name}`}
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
                  onImgClick={onPlaceClick}
                  history={history}
                  onFavoriteClick={onFavoriteClick}
                  isAuthenticated={isAuthenticated}
                  activeOfferId={activeOfferId}
                />
              </section>
              <div className="cities__right-section">
                <Map
                  key={currentCity.name}
                  currentCity={currentCity}
                  activeOfferId={activeOfferId}
                  cityOffers={cityOffers}
                  onPinClick={onPlaceClick}
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
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
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
    dispatch(Operation.toggleFavorite(offer));
  },
});

export {MainPage};
export default withActiveOfferId(
    withTransformProps(
        (props) => ({
          ...props,
          onPlaceClick: props.setActiveId,
        })
    )(connect(mapStateToProps, mapDispatchToProps)(MainPage))
);
