import { createStore } from 'redux';
import userReducer from '../reducers';

const store = createStore(
  userReducer,
  // eslint-disable-next-line
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
