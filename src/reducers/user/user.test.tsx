import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import {Operation, reducer, ActionCreator, ActionType} from './user';
import {ResponseStatus} from '../../types/enums/response-status';

describe(`Test API works correctly`, () => {
  it(`API correctly post to /login`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch, dispatch);
    const apiMock = new MockAdapter(api);
    const authStatus = Operation.login({});

    apiMock.onPost(`/login`)
      .reply(ResponseStatus.OK, {});

    return authStatus(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOGIN,
          payload: {},
        });
      });
  });
});

describe(`Test ActionCreator reducer data`, () => {
  it(`set isAuthenticated`, () => {
    expect(ActionCreator.requireAuthorization(false)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: false,
    });
  });
  it(`set login`, () => {
    expect(ActionCreator.login({})).toEqual({
      type: ActionType.LOGIN,
      payload: {},
    });
  });
  it(`set pendingAuthorization status`, () => {
    expect(ActionCreator.pendingAuthorization(true)).toEqual({
      type: ActionType.PENDING_AUTHORIZATION,
      payload: true,
    });
  });
});

describe(`Test reducer data`, () => {
  it(`authorization status`, () => {
    expect(reducer({isAuthenticated: true}, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: false,
    })).toEqual({
      isAuthenticated: false,
    });
  });
  it(`load user data`, () => {
    expect(reducer({user: {}}, {
      type: ActionType.LOGIN,
      payload: {},
    })).toEqual({
      user: {},
    });
  });
  it(`pendingAuthorization status`, () => {
    expect(reducer({pendingAuthorization: false}, {
      type: ActionType.PENDING_AUTHORIZATION,
      payload: true,
    })).toEqual({
      pendingAuthorization: true,
    });
  });
});
