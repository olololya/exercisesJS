import React, { Component, PropTypes } from 'react';
import Cell from './Cell';

class Board extends Component {

  static propTypes = {
    numRows: PropTypes.number,
    numCols: PropTypes.number,
    openCell: PropTypes.func,
    getInner: PropTypes.func,
    isBomb: PropTypes.func,
    isFlag: PropTypes.func,
    openCells: PropTypes.string,
    setFlag: PropTypes.func };

  isOpen(id) {
    const arr = this.props.openCells.split(',');
    return (arr.indexOf(id) !== -1);
  }

  render() {
    return (
      <table cellPadding={0}>
        <tbody>
          {Array(this.props.numRows).fill(null).map((row, indexRow) =>
            <tr key={indexRow}>
              {Array(this.props.numCols).fill(null).map((col, indexCol) => {
                const id = `${indexRow + 1} ${indexCol + 1}`;
                return (
                  <Cell
                    key={indexCol}
                    id={id}
                    open={this.isOpen(id)}
                    bomb={this.props.isBomb(id)}
                    flag={this.props.isFlag(id)}
                    inner={this.props.getInner(id)}
                    openCell={this.props.openCell}
                    setFlag={this.props.setFlag}
                  />
                );
              })}
            </tr>)}
        </tbody>
      </table>
    );
  }
}

export default Board;
