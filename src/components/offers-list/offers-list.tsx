import * as React from 'react';
import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/offer';

interface Props {
  rentalOffers: Offer[];
  onFavoriteClick: (Offer) => void;
  isAuthenticated: boolean;
  onImgClick?: () => void;
  className?: string;
  prefix?: string;
  small?: boolean;
  history?: any[];
}

const OffersList = (props: Props) => {
  const {
    rentalOffers,
    onImgClick,
    className,
    prefix,
    small,
    history,
    onFavoriteClick,
    isAuthenticated,
  } = props;

  return (
    <div className={className ? className : `${prefix}__places-list places__list tabs__content`}>
      {rentalOffers.map((offer, idx) => (
        <OfferCard
          offer={offer}
          onImgClick={onImgClick}
          onFavoriteClick={onFavoriteClick}
          isAuthenticated={isAuthenticated}
          key={idx}
          prefix={prefix}
          small={small}
          history={history}
        />
      ))}
    </div>
  );
};

OffersList.defaultProps = {
  prefix: 'cities',
};

export default OffersList;
