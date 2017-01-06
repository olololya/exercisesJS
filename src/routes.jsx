import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/App';
import Search from './components/Search';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/search" />
    <Route path="search" component={Search} />
  </Route>
);
