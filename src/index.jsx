import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './Containers/App';
import rootReducer from './Reducers/rootReducer';
import apiMiddleware from './middlewares';
import './stylesheet/index.scss';

const store = createStore(rootReducer, applyMiddleware(apiMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
