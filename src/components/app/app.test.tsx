import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {App} from './app';
import {userMock} from '../../mocks/user';
import {User} from '../../types/user';

configure({adapter: new Adapter()});

describe('App', () => {
  it('renders correctly', () => {
    const app = shallow(
        <App
          isAuthenticated={true}
          pendingAuthorization={false}
          user={userMock as User}
          location={{pathname: '/'}}
        />
    );

    expect(shallowToJson(app)).toMatchSnapshot();
  });
});
