import React, { Component, PropTypes } from 'react';

class Status extends Component {

  static propTypes = {
    numFlags: PropTypes.number,
    statusGame: PropTypes.string };

  static defaultProps = {
    numFlags: 0 };

  render() {
    return (
      <div className="status-container">
        <div>
          <p>NumFlags:</p>
          {this.props.numFlags}
        </div>
        <div>
          <p>Status:</p>
          {this.props.statusGame}
        </div>
      </div>
    );
  }
}

export default Status;
