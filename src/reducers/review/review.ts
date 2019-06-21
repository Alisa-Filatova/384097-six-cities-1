const initialState = {
  reviewsList: [],
  saveReviewStatus: null,
};

interface ActionType {
  type: ReviewAction,
  payload: any,
}

enum ReviewAction {
  GET_REVIEWS = 'GET_REVIEWS',
  ADD_REVIEW = 'ADD_REVIEW',
  SET_SAVE_REVIEW_STATUS = 'SET_SAVE_REVIEW_STATUS',
}

const ActionCreator = {
  getReviews: (reviews) => ({
    type: ReviewAction.GET_REVIEWS,
    payload: reviews,
  }),

  addReview: (review) => ({
    type: ReviewAction.ADD_REVIEW,
    payload: review,
  }),

  setSaveReviewStatus: (saveReviewStatus) => ({
    type: ReviewAction.SET_SAVE_REVIEW_STATUS,
    payload: saveReviewStatus,
  }),
};

const Operation = {
  getReviewsList: (id: number) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.getReviews(response.data));
      })
      .catch(() => {});
  },

  saveReview: (id: number, review) => (dispatch, getState, api) => {
    return api.post(`/comments/${id}`, review)
      .then((response) => {
        dispatch(ActionCreator.addReview(response.data));
        dispatch(ActionCreator.setSaveReviewStatus(response.status));
      })
      .catch((error) => {
        if (error) {
          dispatch(ActionCreator.setSaveReviewStatus(error.response.status));
        }
      });
  },
};

const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case ReviewAction.GET_REVIEWS:
      return {
        ...state,
        reviewsList: action.payload,
      };

    case ReviewAction.ADD_REVIEW:
      return {
        ...state,
        reviewsList: action.payload,
      };

    case ReviewAction.SET_SAVE_REVIEW_STATUS:
      return {
        ...state,
        saveReviewStatus: action.payload,
      };

    default:
      return state;
  }
};

export {reducer, ActionCreator, Operation, ReviewAction, initialState};
