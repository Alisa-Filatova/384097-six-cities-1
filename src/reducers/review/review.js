import {ResponseStatus} from '../../enums/response-status';

const initialState = {
  reviewsList: [],
  postReviewStatus: null,
};

const ActionsType = {
  GET_REVIEWS: `GET_REVIEWS`,
  POST_REVIEW: `POST_REVIEW`,
  GET_POST_REVIEW_STATUS: `GET_POST_REVIEW_STATUS`,
};

const ActionCreator = {
  getReviews: (reviews) => ({
    type: ActionsType.GET_REVIEWS,
    payload: reviews,
  }),

  postReview: (reviews) => ({
    type: ActionsType.POST_REVIEW,
    payload: reviews,
  }),

  getPostReviewStatus: (postReviewStatus) => ({
    type: ActionsType.GET_POST_REVIEW_STATUS,
    payload: postReviewStatus,
  }),
};

const Operation = {
  getReviewsList: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.getReviews(response.data));
      })
      .catch(() => {});
  },
  postReview: (id, review) => (dispatch, getState, api) => {
    return api.post(`/comments/${id}`, review)
      .then((response) => {
        dispatch(ActionCreator.postReview(response.data));
        dispatch(ActionCreator.getPostReviewStatus(response.status));
      })
      .catch((error) => {
        if (error.response.status === ResponseStatus.BAD_REQUEST) {
          dispatch(ActionCreator.getPostReviewStatus(error.response.status));
        } else if (error.response.status === ResponseStatus.FORBIDDEN) {
          dispatch(ActionCreator.getPostReviewStatus(error.response.status));
        }
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsType.GET_REVIEWS:
      return Object.assign({}, state, {
        reviewsList: action.payload,
      });
    case ActionsType.POST_REVIEW:
      return Object.assign({}, state, {
        reviewsList: action.payload,
      });
    case ActionsType.GET_POST_REVIEW_STATUS:
      return Object.assign({}, state, {
        postReviewStatus: action.payload,
      });
  }
  return state;
};

export {reducer, ActionCreator, Operation};
