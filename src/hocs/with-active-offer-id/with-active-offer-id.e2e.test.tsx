import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import withActiveItem from './with-active-offer-id';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const WrappedMockComponent = withActiveItem(MockComponent);

it(`Test withActiveOfferId hoc`, () => {
  const wrapper = shallow(<WrappedMockComponent />);

  expect(wrapper.state().activeOfferId).toEqual(null);
  wrapper.props().setActiveId(2);
  expect(wrapper.state().activeOfferId).toEqual(2);
});
