import React from 'react';
import {MemoryRouter as Router} from 'react-router-dom';
import renderer from 'react-test-renderer';
import AppHeader from './app-header.jsx';

const userMock = {
  avatarUrl: `/static/avatar/4.jpg`,
  email: `alicefill@y888.ru`,
  id: 1,
  isPro: false,
  name: `alicefill`,
};

describe(`AppHeader`, () => {
  it(`renders correctly`, () => {
    const header = renderer.create(
        <Router>
          <AppHeader isAuthenticated={true} user={userMock} />
        </Router>
    ).toJSON();
    expect(header).toMatchSnapshot();
  });
});
