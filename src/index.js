import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Container, MuiThemeProvider } from '@material-ui/core';
import store from './store';
import theme from './style';
import './App.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Container>
        <App />
      </Container>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
