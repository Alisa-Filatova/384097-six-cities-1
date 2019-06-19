import {NameSpace} from '../namespaces';
import {keysToCamel} from '../../utils/objectSnakeKeysToCamel';

const NAMESPACE = NameSpace.REVIEWS;

export const getReviews = (state) => {
  return keysToCamel(state[NAMESPACE].reviewsList);
};

export const getPostReviewStatus = (state) => {
  return state[NAMESPACE].postReviewStatus;
};

export const sortReviewsByDate = (state) =>
  getReviews(state).sort((a, b) => new Date(b.date) - new Date(a.date));
