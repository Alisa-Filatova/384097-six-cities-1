import React from 'react';
import renderer from 'react-test-renderer';
import TownsList from './towns-list.jsx';

it(`TownsList renders correctly`, () => {
  const towns = renderer.create(
      <TownsList
        currentTown='Amsterdam'
        onTownClick={jest.fn()}
        towns={[`Paris`, `Amsterdam`]}
      />
  ).toJSON();

  expect(towns).toMatchSnapshot();
});
