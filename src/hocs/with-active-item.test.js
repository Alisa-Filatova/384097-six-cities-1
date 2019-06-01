import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveItem from './with-active-item.jsx';

configure({adapter: new Adapter()});

const MockComponentWrapped = withActiveItem(() => <div />);

describe(`withActiveItem`, () => {
  it(`correctly changed state 'currentItem'`, () => {
    const wrapper = shallow(<MockComponentWrapped />);

    expect(wrapper.props().currentItem).toEqual(null);
    wrapper.props().setActiveItem(1);
    expect(wrapper.props().currentItem).toEqual(1);
  });
});
