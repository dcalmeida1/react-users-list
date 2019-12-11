import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Router } from 'react-router-dom';
import * as actions from './actions';
import Routes from './routes/index';
import history from './services/history';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const instance = axios.create({
      baseURL: `${window.location.protocol}//${window.location.host}`,
    });

    instance
      .get(`/data/users.json`)
      .then(res => dispatch(actions.setInitialState(res.data)))
      .catch(err => console.error(err));
  }, []);

  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}

export default App;
