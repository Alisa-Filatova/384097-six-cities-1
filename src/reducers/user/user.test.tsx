import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import {Operation, reducer, ActionCreator, UserAction, initialState} from './user';
import ResponseStatus from '../../types/enums/response-status';
import {userMock} from '../../mocks/user';

const userSignIn = {
  email: 'alicefill@y888.ru',
  password: 'asd',
};

describe('Test API works correctly', () => {
  it('API correctly post to /login', function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch, dispatch);
    const apiMock = new MockAdapter(api);
    const authStatus = Operation.login(userSignIn);

    apiMock.onPost('/login')
      .reply(ResponseStatus.OK, userSignIn);

    return authStatus(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: UserAction.PENDING_AUTHORIZATION,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: UserAction.LOGIN,
          payload: userSignIn,
        });
      });
  });

  it('API correctly get to /login', function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch, dispatch);
    const apiMock = new MockAdapter(api);
    const authStatus = Operation.checkAuthorization();

    apiMock.onGet('/login')
      .reply(ResponseStatus.OK, userMock);

    return authStatus(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: UserAction.PENDING_AUTHORIZATION,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: UserAction.LOGIN,
          payload: userMock,
        });
      });
  });
});

describe('Test ActionCreator reducer data', () => {
  it('set isAuthenticated', () => {
    expect(ActionCreator.setAuthorizationStatus(false)).toEqual({
      type: UserAction.AUTHORIZATION_STATUS,
      payload: false,
    });
  });

  it('set login', () => {
    expect(ActionCreator.login(userSignIn)).toEqual({
      type: UserAction.LOGIN,
      payload: userSignIn,
    });
  });

  it('set pendingAuthorization status', () => {
    expect(ActionCreator.pendingAuthorization(true)).toEqual({
      type: UserAction.PENDING_AUTHORIZATION,
      payload: true,
    });
  });
});

describe('Test reducer data', () => {
  it('authorization status', () => {
    expect(reducer({...initialState}, {
      type: UserAction.AUTHORIZATION_STATUS,
      payload: true,
    })).toEqual({
      isAuthenticated: true,
      pendingAuthorization: true,
      user: {},
    });
  });

  it('load user data', () => {
    expect(reducer({...initialState}, {
      type: UserAction.LOGIN,
      payload: userMock,
    })).toEqual({
      isAuthenticated: false,
      pendingAuthorization: true,
      user: userMock,
    });
  });

  it('pendingAuthorization status', () => {
    expect(reducer({...initialState}, {
      type: UserAction.PENDING_AUTHORIZATION,
      payload: true,
    })).toEqual({
      isAuthenticated: false,
      pendingAuthorization: true,
      user: {},
    });
  });
});
