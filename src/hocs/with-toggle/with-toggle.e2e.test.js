import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveItem from './with-toggle.jsx';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const WrappedMockComponent = withActiveItem(MockComponent);

it(`Test withToggle hoc`, () => {
  const wrapper = shallow(<WrappedMockComponent />);

  expect(wrapper.state().toggleStatus).toEqual(false);
  wrapper.props().onToggle();
  expect(wrapper.state().toggleStatus).toEqual(true);
});
