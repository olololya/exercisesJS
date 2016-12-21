import React from 'react';
import Header from './Header';
import '../stylesheet/page.scss';

const App = props => (
  <div className="index">
    <Header />
    <div className="page">
      {props.children}
    </div>
  </div>
);

export default App;
