import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const RENTAL_OFFERS = [
  {title: `Beautiful & luxurious apartment at great location`},
  {title: `Wood and stone place`},
  {title: `Canal View Prinsengracht`},
  {title: `Nice, cozy, warm big bed apartment`},
];

const init = () => {
  ReactDOM.render(
      <App rentalOffers={RENTAL_OFFERS} />,
      document.querySelector(`#root`)
  );
};

init();
