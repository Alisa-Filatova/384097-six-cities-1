import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page.jsx';

const App = (props) => {
  const {rentalOffers} = props;

  return <MainPage rentalOffers={rentalOffers} />;
};

App.propTypes = {
  rentalOffers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default App;
