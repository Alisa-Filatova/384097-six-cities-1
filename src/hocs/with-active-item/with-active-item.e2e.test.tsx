import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import withActiveItem from './with-active-item';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const WrappedMockComponent = withActiveItem(MockComponent);

it('Test withActiveItem hoc', () => {
  const wrapper = shallow(<WrappedMockComponent />);

  expect(wrapper.state().currentItem).toEqual(null);

  wrapper.props().setActiveItem({city: 'Paris'});
  expect(wrapper.state().currentItem).toEqual({city: 'Paris'});
});
