import React from 'react';

const PropContainer = (props) => {
  const { classN, num } = props;
  if (classN === 'price') return <div className={`prop-container ${classN}`}>{num}</div>;
  else if (num) return <div className={`prop-container ${classN}`}>{classN}: {num}</div>;
  return null;
};

export default PropContainer;
