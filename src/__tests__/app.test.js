import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import App from '../App';

configure({ adapter: new Adapter() });

describe('teste', () => {
  const initialState = [];
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it('render App component', () => {
    expect(wrapper.find(App).length).toEqual(1);
  });

  it('check action on dispatching', () => {
    let action;
    action = store.getActions();
    expect(action[0].type).toBe('SET_INITIAL_STATE');
  });
});
