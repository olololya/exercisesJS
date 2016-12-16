import React from 'react';

const Icon = (props) => {
  const onclick = () => {
    props.click(props.elem, props.id);
  };

  let style = {};
  let text = '';
  switch (props.type) {
    case 'star':
      if (props.faves) {
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

export default Icon;
