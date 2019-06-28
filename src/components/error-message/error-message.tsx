import * as React from 'react';
import withRedirectRoute from '../../hocs/with-redirect-route/with-redirect-route';

const ErrorMessage = () => {
  return (
    <main
      className="page__main page__main--favorites page__main--favorites-empty"
      style={{height: '100vh'}}
    >
      <div className="page__favorites-container container">
        <section className="favorites favorites--empty">
          <h1 className="visually-hidden">Server Error (500)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Server Error (500)</b>
            <p className="favorites__status-description">
              Sorry, our site is temporarily unavailable.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export {ErrorMessage};
export default withRedirectRoute(ErrorMessage);
