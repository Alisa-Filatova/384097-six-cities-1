import NameSpace from '../namespaces';
import {keysToCamel} from '../../utils/snake-keys-to-camel';

const NAMESPACE = NameSpace.REVIEWS;

export const getReviews = (state) => {
  return keysToCamel(state[NAMESPACE].reviewsList);
};

export const getSaveReviewStatus = (state) => {
  return state[NAMESPACE].saveReviewStatus;
};

export const sortReviewsByDate = (state) =>
  getReviews(state).sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any));
