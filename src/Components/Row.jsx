import React, { Component, PropTypes } from 'react';
import Cell from './Cell';

class Row extends Component {

  render() {
    const cell = this.props.cols.map((col, index) =>
      <Cell cell={ col } key={ index } />);
    return (
      <tr>
        { cell }
      </tr>
    );
  }
}

Row.propTypes = {
  cols: PropTypes.string };

export default Row;
