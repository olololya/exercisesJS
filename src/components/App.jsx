import React from 'react';
import Header from './Header';

const App = props => (
  <div className="index">
    <Header />
    {props.children}
  </div>
);

export default App;
