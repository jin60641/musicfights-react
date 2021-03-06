/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}]  */
import React from 'react';
import {
  configure,
  render,
  shallow,
  mount,
} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import createMiddlewares from './src/store/middlewares';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const mockStore = (...args) => {
  const factory = configureMockStore(createMiddlewares());
  return factory(...args);
};

global.createMockStore = state => ({
  ...mockStore(state),
  dispatch: jest.fn(),
});
global.React = React;
global.shallow = shallow;
global.mount = mount;
global.render = render;
