import React from 'react';
import renderer from 'react-test-renderer';
import {SortBy} from './sort-by.jsx';

describe(`SortBy`, () => {
  it(`renders correctly`, () => {
    const sortBy = renderer.create(
        <SortBy
          onToggle={jest.fn()}
          onLowToHighClick={jest.fn()}
          onHighToLowClick={jest.fn()}
          onPopularClick={jest.fn()}
          onTopRatedClick={jest.fn()}
          isOpen={true}
        />
    ).toJSON();
    expect(sortBy).toMatchSnapshot();
  });
});
