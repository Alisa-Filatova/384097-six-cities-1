import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page.jsx';

const App = (props) => {
  const {rentalOffers} = props;

  return (
    <MainPage rentalOffers={rentalOffers} />
  );
};

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
  })).isRequired,
};

export default App;
