import React from 'react';
import Header from '../Components/Header';
import '../stylesheet/page.scss';

const Index = props => (
  <div className="index">
    <Header />
    <div className="page">
      {props.children}
    </div>
  </div>
);

export default Index;
