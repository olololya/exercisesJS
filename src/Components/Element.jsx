import React, { Component } from 'react';
import { Link } from 'react-router';
import Icon from './Icon';

const PropContainer = (props) => {
  const { classN, num } = props;
  if (classN === 'price') return <div className={`prop-container ${classN}`}>{num}</div>;
  else if (num) return <div className={`prop-container ${classN}`}>{classN}: {num}</div>;
  return null;
};

class Element extends Component {

  render() {
    const { info, route, type, faves, click, id } = this.props;
    const url = `/detail/${route.path}-${id}`;
    return (
      <div className="element-container">
        <Link to={url}>
          <img src={info.thumb_url} alt={info.title} onClick={this.onClick} />
        </Link>

        <div className="info">
          <span>{info.updated_in_days_formatted}</span><br />
          <div className="title">
            <Link to={url} className="link">{info.title}</Link>
            <Icon
              path={type}
              elem={info}
              click={click}
              faves={faves}
              id={id}
              type={type}
            />
          </div>

          <div>
            <PropContainer classN="price" num={info.price_formatted} />
            <PropContainer classN="floor" num={info.floor} />
            <PropContainer classN="bedroom" num={info.bedroom_number} />
            <PropContainer classN="bathroom" num={info.bathroom_number} />
          </div>
        </div>
      </div>
    );
  }
}

export default Element;
