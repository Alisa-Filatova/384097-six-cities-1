import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {ErrorMessage} from './error-message';

describe('ErrorMessage', () => {
  it('renders correctly', () => {
    const message = renderer.create(<ErrorMessage />).toJSON();
    expect(message).toMatchSnapshot();
  });
});
