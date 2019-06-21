import * as React from 'react';
import * as renderer from 'react-test-renderer';
import SortBy from './sort-by';
import SortType from '../../types/enums/sort-type';

describe(`SortBy`, () => {
  it(`renders correctly`, () => {
    const sortBy = renderer.create(
        <SortBy
          currentItem={SortType.POPULAR}
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
