import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {App} from './app.jsx';

configure({adapter: new Adapter()});

const userMock = {
  user: {
    id: 4,
    isPro: false,
    name: `Max`,
    avatarUrl: `img/1.png`
  },
};

describe(`App`, () => {
  it(`renders correctly`, () => {
    const app = shallow(
        <App
          location={`/`}
          isAuthenticated={true}
          cityOffers={[`Amsterdam`, `Paris`]}
          onCityClick={jest.fn()}
          pendingAuthorization={false}
          user={userMock}
        />
    );

    expect(shallowToJson(app)).toMatchSnapshot();
  });
});
