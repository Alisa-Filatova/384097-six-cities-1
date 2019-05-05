import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page.jsx';

const App = (props) => {
  const {rentalOffers, onOfferTitleClick} = props;

  return (
    <MainPage
      rentalOffers={rentalOffers}
      onOfferTitleClick={onOfferTitleClick}
    />
  );
};

App.propTypes = {
  rentalOffers: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
  })).isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
};

export default App;
