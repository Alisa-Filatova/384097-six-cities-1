const initialState = {
  reviewsList: [],
};

const ActionsType = {
  GET_REVIEWS: `GET_REVIEWS`,
  POST_REVIEW: `POST_REVIEW`,
};

const ActionCreators = {
  getReviews: (reviews) => {
    return {
      type: ActionsType.GET_REVIEWS,
      payload: reviews,
    };
  },
  postReview: (reviews) => ({
    type: ActionsType.POST_REVIEW,
    payload: reviews,
  }),
};


const Operation = {
  getReviewsList: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreators.getReviews(response.data));
      });
  },
  postReview: (id, review) => (dispatch, getState, api) => {
    return api.post(`/comments/${id}`, review)
      .then((response) => {
        dispatch(ActionCreators.postReview(response.data));
      })
      .catch((error) => {
        throw error;
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
  }
  return state;
};

export {reducer, ActionCreators, Operation};
