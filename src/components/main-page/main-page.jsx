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

    this._handleLowToHighClick = this._handleLowToHighClick.bind(this);
    this._handleHighToLowClick = this._handleHighToLowClick.bind(this);
    this._handleTopRatedClick = this._handleTopRatedClick.bind(this);
    this._handlePopularClick = this._handlePopularClick.bind(this);
  }

  render() {
    const {
      onCityClick,
      currentCity,
      cityOffers,
      activeOfferId,
      setActiveItem,
      cities,
      offersLoaded,
    } = this.props;

    return (
      <main className={`page__main page__main--index ${cityOffers.length === 0 ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          cities={cities}
          currentCity={currentCity}
          onCityClick={onCityClick}
        />
        {!offersLoaded && <div>Loading...</div>}
        {offersLoaded && cityOffers.length > 0 &&
          <div className="cities__places-wrapper" style={{height: `100vh`}}>
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {`${cityOffers.length} ${cityOffers.length === 1 ? `place` : `places`} to stay in ${currentCity.name}`}
                </b>
                <WrappedSortBy
                  currentItem={this.props.sortValue}
                  onPopularClick={this._handlePopularClick}
                  onLowToHighClick={this._handleLowToHighClick}
                  onHighToLowClick={this._handleHighToLowClick}
                  onTopRatedClick={this._handleTopRatedClick}
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
        }
        {offersLoaded && cityOffers.length === 0 && (
          <MainPageEmpty currentCity={currentCity} />
        )}
      </main>
    );
  }

  _handleLowToHighClick() {
    this.props.onLowToHighClick();
  }

  _handleHighToLowClick() {
    this.props.onHighToLowClick();
  }

  _handleTopRatedClick() {
    this.props.onTopRatedClick();
  }

  _handlePopularClick() {
    this.props.onPopularClick();
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
  offersLoaded: PropTypes.bool,
  sortValue: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentCity: getCurrentCity(state),
  rentalOffers: getOffers(state),
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
