import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from './Icon';
import PropContainer from './PropContainer';

const Element = (props) => {
  const { info, route, type, isFave, click } = props;
  const url = `/detail/${route.path}-${info.id}`;
  return (
    <div className="element-container">
      <Link to={url}>
        <img src={info.thumb_url} alt={info.title} />
      </Link>

      <div className="info">
        <span>{info.updated_in_days_formatted}</span><br />
        <div className="title">
          <Link to={url} className="link">{info.title}</Link>
          <Icon
            elem={info}
            click={click}
            isFave={isFave}
            type={type}
          />
        </div>

        <div>
          <PropContainer classN="price" price={info.price_formatted} />
          <PropContainer classN="floor" num={info.floor} />
          <PropContainer classN="bedroom" num={info.bedroom_number} />
          <PropContainer classN="bathroom" num={info.bathroom_number} />
        </div>
      </div>
    </div>
  );
};

Element.propTypes = {
  info: PropTypes.object,
  type: PropTypes.string,
  route: PropTypes.object,
  isFave: PropTypes.bool,
  click: PropTypes.func
};

export default Element;
