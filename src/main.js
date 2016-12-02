import React from 'react';
import ReactDOM from 'react-dom';

import ToDoApp from './Components/ToDoApp.js';

import '../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

ReactDOM.render(
  <ToDoApp />,
  document.getElementById('app')
);