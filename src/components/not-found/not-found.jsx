import React from 'react';

const NotFound = () => {
  return (
    <div className="cities__places-wrapper" style={{height: `100vh`}}>
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">Page not found</b>
            <p className="cities__status-description">
              Oops! The page you were looking for does not exist
            </p>
          </div>
        </section>
        <div className="cities__right-section" />
      </div>
    </div>
  );
};

export default NotFound;
