import * as React from 'react';
import OfferCard from '../offer-card/offer-card';
import CityTab from '../city-tab/city-tab';
import {CityOffersGroup, Offer} from '../../types/offer';

interface Props {
  offersGroup: CityOffersGroup;
  onFavoriteClick: (offer: Offer) => void;
  isAuthenticated: boolean;
}

const FavoriteOffersGroup = (props: Props) => {
  const {offersGroup, onFavoriteClick, isAuthenticated} = props;

  return (
    <div className="favorites__list">
      {Object.entries(offersGroup).map(([key, value]) => (
        <div
          className="favorites__locations-items"
          key={key}
        >
          <div className="favorites__locations locations locations--current">
            <CityTab city={key} isActive />
          </div>
          <div className="favorites__places">
            {Object.values(value).map((offer, idx) => (
              <OfferCard
                offer={offer}
                onFavoriteClick={onFavoriteClick}
                isAuthenticated={isAuthenticated}
                key={`${offer.title}${idx}`}
                prefix="favorites"
                small
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteOffersGroup;
