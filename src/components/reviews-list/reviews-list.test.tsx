import React from 'react';
import renderer from 'react-test-renderer';
import ReviewsList from './reviews-list.jsx';

const mock = [
  {
    id: 1,
    user: {
      id: 4,
      isPro: false,
      name: `Max`,
      avatarUrl: `img/1.png`
    },
    rating: 4,
    comment: `A quiet cozy and picturesque that hides behind ` +
      `a a river by the unique lightness of Amsterdam.`,
    date: `2019-05-08T14:13:56.569Z`,
  },
  {
    id: 2,
    user: {
      id: 5,
      isPro: true,
      name: `Max`,
      avatarUrl: `img/1.png`
    },
    rating: 4,
    comment: `A quiet cozy and picturesque that hides behind ` +
      `a a river by the unique lightness of Amsterdam.`,
    date: `2019-05-08T14:13:56.569Z`,
  },
];

describe(`ReviewsList`, () => {
  it(`renders correctly`, () => {
    const form = renderer.create(
        <ReviewsList reviews={mock} />
    ).toJSON();
    expect(form).toMatchSnapshot();
  });
});
