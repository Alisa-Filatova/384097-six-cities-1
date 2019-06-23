import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import withToggle from '../with-toggle/with-toggle';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const WrappedMockComponent = withToggle(MockComponent);

it(`Test withToggle hoc`, () => {
  const wrapper = shallow(<WrappedMockComponent />);

  wrapper.props().onToggle();
  expect(wrapper.state().toggleStatus).toEqual(true);
  wrapper.props().onToggle();
  expect(wrapper.state().toggleStatus).toEqual(false);
});
