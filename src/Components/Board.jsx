import React, { Component, PropTypes } from 'react';
import Cell from './Cell';

class Board extends Component {

  isOpen(x, y) {
    const id = `${x} ${y}`;
    const arr = this.props.openCells.split(',');
    return (arr.indexOf(id) !== -1);
  }

  render() {
    return (
      <table cellPadding={0}>
        <tbody>
          {Array(this.props.numRows).fill(null).map((row, indexRow) =>
            <tr key={indexRow}>
              {Array(this.props.numCols).fill(null).map((col, indexCol) =>
                <Cell
                  key={indexCol}
                  idRow={indexRow + 1}
                  idCell={indexCol + 1}
                  open={this.isOpen(indexRow + 1, indexCol + 1)}
                  openCell={this.props.openCell}
                  getInner={this.props.getInner}
                  isBomb={this.props.isBomb}
                  isFlag={this.props.isFlag}
                  setFlag={this.props.setFlag}
                />)}
            </tr>)}
        </tbody>
      </table>
    );
  }
}

Board.propTypes = {
  numRows: PropTypes.number,
  numCols: PropTypes.number,
  openCell: PropTypes.func,
  getInner: PropTypes.func,
  isBomb: PropTypes.func,
  isFlag: PropTypes.func,
  openCells: PropTypes.string,
  setFlag: PropTypes.func };

export default Board;
