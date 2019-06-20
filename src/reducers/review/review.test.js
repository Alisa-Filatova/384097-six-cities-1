import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import {Operation, reducer, ActionCreator, ActionType} from './review';
import {ResponseStatus} from '../../enums/response-status';

describe(`Test API works correctly`, () => {
  it(`API correctly get to /comments/id`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const getReviews = Operation.getReviewsList(1);

    apiMock.onGet(`/comments/1`)
      .reply(ResponseStatus.OK, []);

    return getReviews(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_REVIEWS,
          payload: [],
        });
      });
  });

  it(`API correctly post to /comments/id`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const postReview = Operation.postReview(1, {});

    apiMock.onPost(`/comments/1`)
      .reply(ResponseStatus.OK, []);

    return postReview(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.POST_REVIEW,
          payload: [],
        });
      });
  });
});

describe(`Test ActionCreator reducer data`, () => {
  it(`set reviewsList`, () => {
    expect(ActionCreator.getReviews([])).toEqual({
      type: ActionType.GET_REVIEWS,
      payload: [],
    });
  });
  it(`set postReview`, () => {
    expect(ActionCreator.postReview([])).toEqual({
      type: ActionType.POST_REVIEW,
      payload: [],
    });
  });
  it(`set postReview status status`, () => {
    expect(ActionCreator.getPostReviewStatus(true)).toEqual({
      type: ActionType.GET_POST_REVIEW_STATUS,
      payload: true,
    });
  });
});

describe(`Test reducer data`, () => {
  it(`get reviewsList`, () => {
    expect(reducer({reviewsList: []}, {
      type: ActionType.GET_REVIEWS,
      payload: [{}],
    })).toEqual({
      reviewsList: [{}],
    });
  });
  it(`post review`, () => {
    expect(reducer({reviewsList: []}, {
      type: ActionType.POST_REVIEW,
      payload: [{}],
    })).toEqual({
      reviewsList: [{}],
    });
  });
  it(`get postReview status`, () => {
    expect(reducer({postReviewStatus: false}, {
      type: ActionType.GET_POST_REVIEW_STATUS,
      payload: true,
    })).toEqual({
      postReviewStatus: true,
    });
  });
});
