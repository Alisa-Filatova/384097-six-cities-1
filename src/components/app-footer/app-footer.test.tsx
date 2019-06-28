import * as React from 'react';
import {MemoryRouter as Router} from 'react-router-dom';
import * as renderer from 'react-test-renderer';
import AppFooter from './app-footer';

describe('AppFooter', () => {
  it('renders correctly', () => {
    const footer = renderer.create(
        <Router>
          <AppFooter />
        </Router>
    ).toJSON();
    expect(footer).toMatchSnapshot();
  });
});
