import React, { PropTypes } from 'react';

const Status = props => (
  <div className="status-container">
    <div>
      <p>NumFlags:</p>
      {props.numFlags}
    </div>
    <div>
      <p>Status:</p>
      {props.status}
    </div>
  </div>
);

Status.propTypes = {
  numFlags: PropTypes.number,
  status: PropTypes.string
};

export default Status;
