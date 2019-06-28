import * as React from 'react';
import * as renderer from 'react-test-renderer';
import FavoriteButton from './favorite-button';

describe('FavoriteButton', () => {
  it('renders correctly', () => {
    const button = renderer.create(
        <FavoriteButton
          onClick={jest.fn()}
          isActive={false}
        />
    ).toJSON();
    expect(button).toMatchSnapshot();
  });
});
