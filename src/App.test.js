import App from './App';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('div')).toHaveLength(1);
});
