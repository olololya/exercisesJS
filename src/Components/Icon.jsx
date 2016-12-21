import React, { PropTypes } from 'react';

const Icon = (props) => {
  const onclick = () => {
    props.click(props.elem);
  };

  let style = {};
  let text = '';
  switch (props.type) {
    case 'star':
      if (props.isFave) {
        style = { color: 'gold' };
        text = '\u2605';
      } else text = '\u2606';
      break;
    case 'cross':
      style = { color: 'red' };
      text = '\u2716';
      break;
    default: break;
  }
  return <button onClick={onclick} style={style}>{text}</button>;
};

Icon.propTypes = {
  click: PropTypes.func,
  type: PropTypes.string,
  elem: PropTypes.object,
  isFave: PropTypes.bool
};

export default Icon;
