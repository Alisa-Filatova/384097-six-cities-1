import React from 'react';
import renderer from 'react-test-renderer';
import {SignIn} from './sign-in.jsx';

describe(`SignIn page`, () => {
  it(`renders correctly`, () => {
    const page = renderer.create(
        <SignIn onLogin={jest.fn()} />
    ).toJSON();
    expect(page).toMatchSnapshot();
  });
});
