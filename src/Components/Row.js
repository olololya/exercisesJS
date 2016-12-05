import React, { Component } from 'react';

import Cell from './Cell';

class Row extends Component {

  render() {
    let cols = new Array(this.props.numCols).fill(null);

    return (
      <tr id={this.props.id}>
      </tr>
    );
  }
}

export default Row;