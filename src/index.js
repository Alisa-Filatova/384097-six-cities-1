import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import rentalOffers from './mocks/offers';

const init = () => {
  ReactDOM.render(
      <App
        rentalOffers={rentalOffers}
        onOfferTitleClick={() => {}}
      />,
      document.querySelector(`#root`)
  );
};

init();
