import * as React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import {Router} from 'react-router-dom';
import history from './utils/history';
import reducer from './reducers/index';
import {Operation, ActionCreator} from './reducers/data/data';
import {Operation as UserOperation, ActionCreator as UserActions} from './reducers/user/user';
import {getRandomOffer} from './reducers/data/selectors';
import {createAPI} from './api';
import {ROUTES} from './constants/constants';
import App from './components/app/app.jsx';

const api = createAPI(
    () => {
      store.dispatch(UserActions.requireAuthorization(false));
    },
    () => {
      store.dispatch(UserActions.requireAuthorization(false));
      history.push(ROUTES.ERROR);
    }
);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (a) => a
    )
);

store.dispatch(UserOperation.checkAuthorization());

store.dispatch(Operation.loadOffers())
  .then(() => {
    const currentState = store.getState();
    const offer = getRandomOffer(currentState);

    if (offer) {
      store.dispatch(ActionCreator.changeCity(offer.city));
    }
  });

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    document.querySelector(`#root`)
);
