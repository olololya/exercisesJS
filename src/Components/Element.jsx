import React from 'react';

const PropContainer = (props) => {
  const { classN, num } = props;
  if (classN === 'price') return <div className={`prop-container ${classN}`}>{num}</div>;
  else if (num) return <div className={`prop-container ${classN}`}>{classN}: {num}</div>;
  return null;
};

const Element = props => (
  <div className="element-container">
    <img src={props.info.thumb_url} alt={props.info.title} />
    <div className="info">
      <span>{props.info.updated_in_days_formatted}</span><br />
      <h3>{props.info.title}</h3><br />

      <div>
        <PropContainer classN="price" num={props.info.price_formatted} />
        <PropContainer classN="floor" num={props.info.floor} />
        <PropContainer classN="bedroom" num={props.info.bedroom_number} />
        <PropContainer classN="bathroom" num={props.info.bathroom_number} />
      </div>
    </div>
  </div>
);

export default Element;
