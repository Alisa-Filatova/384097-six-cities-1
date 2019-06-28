import * as React from 'react';
import * as renderer from 'react-test-renderer';
import MainPageEmpty from './main-page-empty';
import {cityMock} from '../../mocks/city';

describe('MainPageEmpty', () => {
  it('renders correctly', () => {
    const page = renderer.create(
        <MainPageEmpty currentCity={cityMock} />
    ).toJSON();
    expect(page).toMatchSnapshot();
  });
});
