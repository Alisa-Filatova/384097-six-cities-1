import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CitiesList from './cities-list';
import {cityMock} from '../../mocks/city';
import {City} from '../../types/offer';

describe('CitiesList', () => {
  it('renders correctly', () => {
    const list = renderer.create(
        <CitiesList
          cities={[cityMock] as City[]}
          currentCity={cityMock}
          onCityClick={jest.fn()}
        />
    ).toJSON();
    expect(list).toMatchSnapshot();
  });
});
