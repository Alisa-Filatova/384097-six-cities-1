import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducers/data/data';
import {
  getCurrentCity,
  getCities,
  getOffersLoadStatus,
  getOffers,
  getSortValue,
  sortOffers,
} from '../../reducers/data/selectors';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import SortBy from '../sort-by/sort-by.jsx';
import MainPageEmpty from '../main-page-empty/main-page-empty.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import withTransformProps from '../../hocs/with-transform-props/with-transform-props.jsx';
import withToggle from '../../hocs/with-toggle/with-toggle.jsx';
import {SortType} from '../../types/sort-type';

const WrappedOffersList = withActiveItem(OffersList);
const WrappedSortBy = withToggle(
    withTransformProps((props) => Object.assign({}, props, {
      isOpen: props.toggleStatus,
    }))(SortBy));

class MainPage extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      activeOfferId: null,
    };

    this._handleGetActiveOffer = this._handleGetActiveOffer.bind(this);
  }

  render() {
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
      sortValue,
    } = this.props;

    const {activeOfferId} = this.state;

    return (
      <main className={`page__main page__main--index ${cityOffers.length === 0 ? `page__main--index-empty` : ``}`}>
        {!offersLoaded && <div>Loading...</div>}
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
                  <WrappedSortBy
                    currentItem={sortValue}
                    onPopularClick={onPopularClick}
                    onLowToHighClick={onLowToHighClick}
                    onHighToLowClick={onHighToLowClick}
                    onTopRatedClick={onTopRatedClick}
                  />
                  <WrappedOffersList
                    rentalOffers={cityOffers}
                    setActiveItem={this._handleGetActiveOffer}
                    history={this.props.history}
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
          <MainPageEmpty currentCity={currentCity}/>
        )}
      </main>
    );
  }

  _handleGetActiveOffer(offerId) {
    this.setState((prevState) => {
      return Object.assign({}, prevState, {activeOfferId: offerId});
    });
  }
}

MainPage.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.object),
  currentCity: PropTypes.object.isRequired,
  onCityClick: PropTypes.func.isRequired,
  cityOffers: PropTypes.array.isRequired,
  currentFilter: PropTypes.any,
  onPopularClick: PropTypes.func,
  onLowToHighClick: PropTypes.func,
  onHighToLowClick: PropTypes.func,
  onTopRatedClick: PropTypes.func,
  offersLoaded: PropTypes.bool,
  sortValue: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentCity: getCurrentCity(state),
  cityOffers: sortOffers(state),
  cities: getCities(state),
  offersLoaded: getOffersLoadStatus(state),
  sortValue: getSortValue(state),
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
});

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
