/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}]  */
import {
  configure,
  render,
  shallow,
  mount,
} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import createMiddlewares from 'src/store/middlewares';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const shallowWithDive = (wrapper, name) => {
  let component = shallow(wrapper);

  if (!name) {
    return component;
  }

  while (component.name() !== name) {
    component = component.dive();
  }

  return component.dive();
};

const mockStore = (...args) => {
  const factory = configureMockStore(createMiddlewares());
  return factory(...args);
};

global.createMockStore = state => ({
  ...mockStore(state),
  dispatch: jest.fn(),
});
global.shallow = shallowWithDive;
global.mount = mount;
global.render = render;
