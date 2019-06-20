import React from 'react';
import renderer from 'react-test-renderer';
import ErrorMessage from './error-message.jsx';

describe(`ErrorMessage`, () => {
  it(`renders correctly`, () => {
    const message = renderer.create(<ErrorMessage />).toJSON();
    expect(message).toMatchSnapshot();
  });
});
