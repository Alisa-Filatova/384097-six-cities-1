import React from 'react';
import {MemoryRouter as Router} from 'react-router-dom';
import renderer from 'react-test-renderer';
import AppLogo from './app-logo.jsx';

describe(`AppLogo`, () => {
  it(`renders correctly`, () => {
    const logo = renderer.create(
        <Router>
          <AppLogo />
        </Router>
    ).toJSON();
    expect(logo).toMatchSnapshot();
  });
});
