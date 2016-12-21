import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Routes from './Components/Routes';
import rootReducer from './Reducers/rootReducer';
import apiMiddleware from './middleware';
import './stylesheet/index.scss';

const store = createStore(rootReducer, applyMiddleware(apiMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
