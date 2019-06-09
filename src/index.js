import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import reducer from './reducers/index';
import {Operation, ActionCreator} from './reducers/data/data';
import {getOffers} from './reducers/data/selectors';
import {createAPI} from './api';
import App from './components/app/app.jsx';

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
  );

  const getRandomItem = (items) => {
    const min = 0;
    const max = Math.floor(items.length);
    return items[Math.floor(Math.random() * (max - min)) + min];
  };

  store.dispatch(Operation.loadOffers())
    .then(() => {
      const currentState = store.getState();
      const offer = getRandomItem(getOffers(currentState));

      if (offer) {
        store.dispatch(ActionCreator.changeTown(offer.city));
      }
    });

  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
