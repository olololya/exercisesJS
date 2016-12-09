import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Home from '../Containers/Home';
import Board from '../Containers/Board';
import Login from '../Containers/Login';

const App = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Home}>
      <Route path="login" component={Login} />
      <Route path="game">
        <Route path="easy" components={Board} />
        <Route path="normal" components={Board} />
        <Route path="hard" components={Board} />
      </Route>
    </Route>
  </Router>
);

export default App;
