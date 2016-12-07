import React, { PropTypes } from 'react';
import Cell from './Cell';

const Board = props => (
  <table cellPadding={0}>
    <tbody>
      {Array(props.numRows).fill(null).map((row, indexRow) =>
        <tr key={indexRow}>
          {Array(props.numCols).fill(null).map((col, indexCol) => {
            const id = `${indexRow + 1} ${indexCol + 1}`;
            return (
              <Cell
                key={indexCol}
                id={id}
                open={props.isOpen(id)}
                bomb={props.isBomb(id)}
                flag={props.isFlag(id)}
                inner={props.getInner(id)}
                openCell={props.openCell}
                setFlag={props.setFlag}
              />
            );
          })}
        </tr>)}
    </tbody>
  </table>
);

Board.propTypes = {
  numRows: PropTypes.number,
  numCols: PropTypes.number,
  openCell: PropTypes.func,
  getInner: PropTypes.func,
  isBomb: PropTypes.func,
  isFlag: PropTypes.func,
  isOpen: PropTypes.func,
  setFlag: PropTypes.func
};

export default Board;
