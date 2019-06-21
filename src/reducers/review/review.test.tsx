import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import {Operation, reducer, ActionCreator, ReviewAction, initialState} from './review';
import ResponseStatus from '../../types/enums/response-status';
import {reviewsListMock} from '../../mocks/reviews-list';
import {reviewMock} from '../../mocks/review';

describe(`Test API works correctly`, () => {
  it(`API correctly get to /comments/id`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch, jest.fn());
    const apiMock = new MockAdapter(api);
    const getReviews = Operation.getReviewsList(1);

    apiMock.onGet(`/comments/1`)
      .reply(ResponseStatus.OK, reviewsListMock);

    return getReviews(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ReviewAction.GET_REVIEWS,
          payload: reviewsListMock,
        });
      });
  });

  it(`API correctly post to /comments/id`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch, dispatch);
    const apiMock = new MockAdapter(api);
    const saveReview = Operation.saveReview(1, {});

    apiMock.onPost(`/comments/1`)
      .reply(ResponseStatus.OK, reviewMock);

    return saveReview(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ReviewAction.ADD_REVIEW,
          payload: reviewMock,
        });
      });
  });
});

describe(`Test ActionCreator reducer data`, () => {
  it(`set reviewsList`, () => {
    expect(ActionCreator.getReviews(reviewsListMock)).toEqual({
      type: ReviewAction.GET_REVIEWS,
      payload: reviewsListMock,
    });
  });

  it(`set saveReview`, () => {
    expect(ActionCreator.addReview(reviewMock)).toEqual({
      type: ReviewAction.ADD_REVIEW,
      payload: reviewMock,
    });
  });

  it(`set saveReview status status`, () => {
    expect(ActionCreator.setSaveReviewStatus(ResponseStatus.OK)).toEqual({
      type: ReviewAction.SET_SAVE_REVIEW_STATUS,
      payload: ResponseStatus.OK,
    });
  });
});

describe(`Test reducer data`, () => {
  it(`get reviewsList`, () => {
    expect(reducer({...initialState}, {
      type: ReviewAction.GET_REVIEWS,
      payload: reviewsListMock,
    })).toEqual({
      reviewsList: reviewsListMock,
      saveReviewStatus: null,
    });
  });

  it(`add review`, () => {
    expect(reducer({...initialState}, {
      type: ReviewAction.ADD_REVIEW,
      payload: reviewsListMock,
    })).toEqual({
      reviewsList: reviewsListMock,
      saveReviewStatus: null,
    });
  });

  it(`get saveReview status`, () => {
    expect(reducer({...initialState}, {
      type: ReviewAction.SET_SAVE_REVIEW_STATUS,
      payload: ResponseStatus.OK,
    })).toEqual({
      reviewsList: [],
      saveReviewStatus: ResponseStatus.OK,
    });
  });
});
