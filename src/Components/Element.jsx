import React from 'react';

const PropContainer = (props) => {
  const { classN, num } = props;
  if (classN === 'price') return <div className={`prop-container ${classN}`}>{num}</div>;
  else if (num) return <div className={`prop-container ${classN}`}>{classN}: {num}</div>;
  return null;
};

const Icon = (props) => {
  const onclick = () => props.click(props.elem);
  let style = {};
  let text = '';
  switch (props.path) {
    case 'search':
    case 'detail':
      if (props.faves) {
        style = { color: 'gold' };
        text = '\u2605';
      } else text = '\u2606';
      break;
    case 'faves':
      style = { color: 'red' };
      text = '\u2716';
      break;
    default: break;
  }
  return <button onClick={onclick} style={style}>{text}</button>;
};

const Element = props => (
  <div className="element-container">
    <img src={props.info.thumb_url} alt={props.info.title} />

    <div className="info">
      <span>{props.info.updated_in_days_formatted}</span><br />
      <div className="title">
        <h3>{props.info.title}</h3>
        <Icon
          path={props.route.path}
          elem={props.info}
          click={props.click}
          faves={props.faves}
        />
      </div>

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
