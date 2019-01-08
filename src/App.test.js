import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const requiredReduxState = {
  user: null,
};

describe('<App />', () => {
  it('has no children when not loggined', () => {
    const mockStore = createMockStore({
      ...requiredReduxState,
    });
    const wrapper = shallow(<App store={mockStore} />).dive();
    expect(wrapper.type()).toBeNull();
  });

  it('has BrowserRouter when logged in', () => {
    const mockStore = createMockStore({
      ...requiredReduxState,
      user: { id: 1 },
    });
    const wrapper = shallow(<App store={mockStore} />, 'App').dive();
    expect(wrapper.find(BrowserRouter)).toHaveLength(1);
  });
});
