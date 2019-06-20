const initialState = {
  reviewsList: [],
  postReviewStatus: null,
};

const ActionType = {
  GET_REVIEWS: `GET_REVIEWS`,
  POST_REVIEW: `POST_REVIEW`,
  GET_POST_REVIEW_STATUS: `GET_POST_REVIEW_STATUS`,
};

const ActionCreator = {
  getReviews: (reviews) => ({
    type: ActionType.GET_REVIEWS,
    payload: reviews,
  }),

  postReview: (reviews) => ({
    type: ActionType.POST_REVIEW,
    payload: reviews,
  }),

  getPostReviewStatus: (postReviewStatus) => ({
    type: ActionType.GET_POST_REVIEW_STATUS,
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
        if (error) {
          dispatch(ActionCreator.getPostReviewStatus(error.response.status));
        }
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_REVIEWS:
      return Object.assign({}, state, {
        reviewsList: action.payload,
      });
    case ActionType.POST_REVIEW:
      return Object.assign({}, state, {
        reviewsList: action.payload,
      });
    case ActionType.GET_POST_REVIEW_STATUS:
      return Object.assign({}, state, {
        postReviewStatus: action.payload,
      });
  }
  return state;
};

export {reducer, ActionCreator, Operation, ActionType};
