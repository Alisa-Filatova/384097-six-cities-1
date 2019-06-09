import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducers/data/data';
import {getOffers, getCurrentCity, getCityOffers} from '../../reducers/data/selectors';
import MainPage from '../main-page/main-page.jsx';

class App extends React.Component {
  render() {
    const {rentalOffers, onTownClick, currentTown, cityOffers} = this.props;

    return (
      <MainPage
        rentalOffers={rentalOffers}
        onTownClick={onTownClick}
        currentTown={currentTown}
        cityOffers={cityOffers}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentTown: getCurrentCity(state),
  rentalOffers: getOffers(state),
  cityOffers: getCityOffers(state),
  isAuthorizationRequired: state.user.isAuthorizationRequired,
});

const mapDispatchToProps = (dispatch) => ({
  onTownClick: (currentTown) => {
    dispatch(ActionCreator.changeTown(currentTown));
  },
});

App.propTypes = {
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
  onTownClick: PropTypes.func.isRequired,
  currentTown: PropTypes.object.isRequired,
  cityOffers: PropTypes.array.isRequired,
  isAuthorizationRequired: PropTypes.bool,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
