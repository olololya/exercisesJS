import React, { PropTypes } from 'react';

const PropContainer = (props) => {
  const { classN, num, price } = props;
  if (classN === 'price') return <div className={`prop-container ${classN}`}>{price}</div>;
  else if (num) return <div className={`prop-container ${classN}`}>{classN}: {num}</div>;
  return null;
};

PropContainer.propTypes = {
  classN: PropTypes.string,
  num: PropTypes.number,
  price: PropTypes.string
};

export default PropContainer;
