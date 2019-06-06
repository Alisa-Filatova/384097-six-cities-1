import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator, MAX_TOWNS} from '../../reducer/reducer';
import MainPage from '../main-page/main-page.jsx';

const App = (props) => {
  const {rentalOffers, onTownClick, currentTown, townsList} = props;

  return (
    <MainPage
      rentalOffers={rentalOffers}
      onTownClick={onTownClick}
      currentTown={currentTown}
      towns={townsList}
    />
  );
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentTown: state.currentTown,
  rentalOffers: state.rentalOffers.filter((offer) => offer.city.name === state.currentTown),
  townsList: [...new Set(state.rentalOffers.map((offer) => offer.city.name))].slice(0, MAX_TOWNS),
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
  currentTown: PropTypes.string.isRequired,
  townsList: PropTypes.arrayOf(PropTypes.string),
  currentOffer: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number,
    }),
  }),
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
