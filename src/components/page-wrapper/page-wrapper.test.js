import React from 'react';
import renderer from 'react-test-renderer';
import PageWrapper from './page-wrapper.jsx';

describe(`PageWrapper`, () => {
  it(`renders correctly`, () => {
    const wrapper = renderer.create(
        <PageWrapper location={`/login`}>
          <div>Some page</div>
        </PageWrapper>
    ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
