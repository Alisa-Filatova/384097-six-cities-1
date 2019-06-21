import * as React from 'react';
import {MemoryRouter as Router} from 'react-router-dom';
import * as renderer from 'react-test-renderer';
import AppHeader from './app-header';
import {userMock} from '../../mocks/user';
import {User} from '../../types/user';

describe(`AppHeader`, () => {
  it(`renders correctly`, () => {
    const header = renderer.create(
        <Router>
          <AppHeader isAuthenticated={true} user={userMock as User} />
        </Router>
    ).toJSON();
    expect(header).toMatchSnapshot();
  });
});
