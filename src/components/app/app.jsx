import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator, MAX_TOWNS} from '../../reducer/reducer';
import MainPage from '../main-page/main-page.jsx';

const App = (props) => {
  const {rentalOffers, onTownClick, currentTown} = props;
  const townsList = [...new Set(rentalOffers.map((offer) => offer.town.name))].slice(0, MAX_TOWNS);

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
  rentalOffers: state.rentalOffers.filter((offer) => offer.town.name === state.currentTown),
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
    img: PropTypes.string,
    isPremium: PropTypes.bool,
    price: PropTypes.number,
    stars: PropTypes.number,
    type: PropTypes.string,
    isInBookmarks: PropTypes.bool,
    coordinates: PropTypes.arrayOf(PropTypes.number),
    town: PropTypes.shape({
      name: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
  })).isRequired,
  onTownClick: PropTypes.func.isRequired,
  currentTown: PropTypes.string.isRequired,
  townsList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
