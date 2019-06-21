import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import withActiveItem from '../with-active-item/with-active-item';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const WrappedMockComponent = withActiveItem(MockComponent);

it(`Test withToggle hoc`, () => {
  const wrapper = shallow(
    <WrappedMockComponent setActiveItem={() => {}} />
  );

  wrapper.props().onToggle();
  expect(wrapper.state().toggleStatus).toEqual(true);
});
