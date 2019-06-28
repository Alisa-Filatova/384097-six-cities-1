import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {SignIn} from './sign-in';
import {userMock} from '../../mocks/user';
import {User} from '../../types/user';

describe('SignIn page', () => {
  it('renders correctly', () => {
    const page = renderer.create(
        <SignIn onLogin={jest.fn()} user={userMock as User}/>
    ).toJSON();
    expect(page).toMatchSnapshot();
  });
});
