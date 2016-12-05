import React, { Component } from 'react';

import Cell from './Cell';

class Board extends Component {

  render() {
    let rows = new Array(this.props.numRows).fill(null);
    let cols = new Array(this.props.numCols).fill(null);
    return (
      <table cellPadding={0}>
        <tbody>
          {rows.map((row, index_row) =>
            <tr key={index_row}>
              {cols.map((col, index_col) =>
                <Cell key={index_col}
                      id_row={index_row + 1}
                      id_cell={index_col + 1}
                      openCell={this.props.openCell}
                      getInner={this.props.getInner}
                      isBomb={this.props.isBomb}
                      isFlag={this.props.isFlag}
                />
              )}
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default Board;