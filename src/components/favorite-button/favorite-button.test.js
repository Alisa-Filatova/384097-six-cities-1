import React from 'react';
import renderer from 'react-test-renderer';
import FavoriteButton from './favorite-button.jsx';

describe(`FavoriteButton`, () => {
  it(`renders correctly`, () => {
    const button = renderer.create(
        <FavoriteButton
          onClick={jest.fn()}
          isActive={false}
        />
    ).toJSON();
    expect(button).toMatchSnapshot();
  });
});
