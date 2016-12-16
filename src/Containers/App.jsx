import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from '../Components/Home';
import Index from './Index';
import Faves from '../Components/Faves';
import Search from '../Components/Search';
import Detail from '../Components/Detail';

const App = () => (
  <Router history={hashHistory}>
    <Route path="/" component={Index}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="faves" component={Faves} />
      <Route path="search" component={Search} />
      <Route path="detail/:array-:id" component={Detail} />
    </Route>
  </Router>
);

export default App;
