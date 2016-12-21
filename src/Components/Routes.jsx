import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './Home';
import App from './App';
import Faves from '../Containers/Faves';
import Search from '../Containers/Search';
import Detail from '../Containers/Detail';


const Routes = () => (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="faves" component={Faves} />
      <Route path="search" component={Search} />
      <Route path="detail/:array-:id" component={Detail} />
    </Route>
  </Router>
);

export default Routes;
