import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import {Router} from 'react-router-dom';
import history from './utils/history';
import reducer from './reducers';
import {ActionCreator, Operation as DataOperation} from './reducers/data/data';
import {Operation as UserOperation, ActionCreator as UserActions} from './reducers/user/user';
import {getRandomOffer} from './reducers/data/selectors';
import {createAPI} from './api';
import {ROUTES} from './constants/constants';
import App from './components/app/app';

declare const __REDUX_DEVTOOLS_EXTENSION__: () => any;

// Если напрямую обратиться к __REDUX_DEVTOOLS_EXTENSION__ в браузерах,
// где не установлен ReduxDevTools, то будет ошибка.
const global: any = window;

const api = createAPI(
    () => {
      store.dispatch(UserActions.setAuthorizationStatus(false));
    },
    () => {
      history.push(ROUTES.ERROR);
    }
);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        global.__REDUX_DEVTOOLS_EXTENSION__ ? __REDUX_DEVTOOLS_EXTENSION__() : (a) => a
    )
);

store.dispatch(UserOperation.checkAuthorization() as any);
store.dispatch(DataOperation.loadOffers() as any)
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
    document.querySelector('#root')
);
