import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import Status from '../Components/Status';
import Cell from '../Components/Cell';

const { StatusGame } = actions;

class Board extends Component {

  componentWillMount() { this.loadGame(); }

  getInner = (id) => {
    const { rows, cols } = this.props.difficult.currDiff;
    let num = 0;
    let [x, y] = id.split(' ');
    x = parseInt(x, 10);
    y = parseInt(y, 10);

    for (let n = x - 1; n <= x + 1; n += 1) {
      if (n >= 1 && n <= rows) {
        for (let m = y - 1; m <= y + 1; m += 1) {
          if (m >= 1 && m <= cols) {
            if (n !== x || m !== y) {
              if (this.isBomb(`${n} ${m}`)) num += 1;
            }
          }
        }
      }
    }
    return num;
  };

  choiceDiff = () => this.props.router.push('/');

  loadGame = () => {
    this.props.actions.startGame();
    this.start();
  };

  flagSet = (id) => {
    if (this.props.status.status === StatusGame.PLAYING) {
      if (this.isOpenCell(id)) return;
      if (this.isFlag(id)) {
        this.props.actions.delFlag(id);
        this.numFlags += 1;
      } else {
        if (this.numFlags > 0) {
          this.props.actions.setFlag(id);
          this.numFlags -= 1;
        }
        if (this.numFlags === 0) this.isWin();
      }
    }
  };

  isOpenCell = id =>
    (this.props.board.openCells.indexOf(id) !== -1);

  isFlag = id =>
    (this.props.board.flagCells.indexOf(id) !== -1);

  isBomb = id =>
    (this.props.board.bombCells.indexOf(id) !== -1);

  generateBomb = () => {
    const { rows, cols } = this.props.difficult.currDiff;
    let { bombs } = this.props.difficult.currDiff;
    const bombCellsLocal = [];

    while (bombs > 0) {
      for (let i = 1; i <= rows; i += 1) {
        if (bombs === 0) break;
        for (let j = 1; j <= cols; j += 1) {
          if (bombCellsLocal.indexOf(`${i} ${j}`) === -1) {
            if ((Math.random() * 100) <= 5) {
              bombCellsLocal.push(`${i} ${j}`);
              bombs -= 1;
            }
          }
          if (bombs === 0) break;
        }
      }
    }
    this.props.actions.generateBombs(bombCellsLocal);
  };

  start = () => {
    this.generateBomb();
    this.openCells = [];
    this.numFlags = this.props.difficult.currDiff.bombs;
  };

  open = (id) => {
    if (this.props.status.status !== StatusGame.PLAYING) return;
    if (this.isFlag(id)) {
      this.props.actions.delFlag(id);
      this.numFlags += 1;
    }
    if (this.isOpenCell(id)) return;

    this.props.actions.openCell(id);
    this.openCells.push(id);
    if (this.isBomb(id)) {
      this.end(StatusGame.LOSE);
      return;
    }

    if (!this.getInner(id) && !this.isFlag(id)) this.openNeighboringCells(id);

    if (this.numFlags === 0) this.isWin();
  };

  end = (status) => {
    const { rows, cols } = this.props.difficult.currDiff;

    for (let i = 1; i <= rows; i += 1) {
      for (let j = 1; j <= cols; j += 1) {
        const id = `${i} ${j}`;
        if (!this.isOpenCell(id)) {
          this.props.actions.openCell(id);
          this.openCells.push(id);
        }
      }
    }
    this.props.actions.endGame(status);
  };

  isWin = () => {
    let numOpenCells = this.props.difficult.currDiff.rows * this.props.difficult.currDiff.cols;
    numOpenCells -= this.props.difficult.currDiff.bombs;
    if (this.openCells.length === numOpenCells) this.end(StatusGame.WIN);
  };

  openNeighboringCells = (id) => {
    const { rows, cols } = this.props.difficult.currDiff;
    let [x, y] = id.split(' ');
    x = parseInt(x, 10);
    y = parseInt(y, 10);

    for (let n = x - 1; n <= x + 1; n += 1) {
      if (n >= 1 && n <= rows) {
        for (let m = y - 1; m <= y + 1; m += 1) {
          if (m >= 1 && m <= cols) {
            if (n !== x || m !== y) {
              const id2 = `${n} ${m}`;
              if (this.openCells.indexOf(id2) === -1 && !this.isBomb(id2) && !this.isFlag(id2)) {
                this.open(id2);
              }
            }
          }
        }
      }
    }
  };

  render() {
    const { rows, cols } = this.props.difficult.currDiff;
    const { status } = this.props.status;

    return (
      <div className="game-container">
        <Status numFlags={this.numFlags} status={status} />
        <button className="game-btn" onClick={this.loadGame}>Restart Game</button>
        <button className="game-btn" onClick={this.choiceDiff}>Choice Difficult</button>
        <table cellPadding={0}>
          <tbody>
            {Array(rows).fill(null).map((row, indexRow) =>
              <tr key={indexRow}>
                {Array(cols).fill(null).map((col, indexCol) => {
                  const id = `${indexRow + 1} ${indexCol + 1}`;
                  return (
                    <Cell
                      key={indexCol}
                      id={id}
                      isOpen={this.isOpenCell(id)}
                      isFlag={this.isFlag(id)}
                      isBomb={this.isBomb(id)}
                      inner={this.getInner(id)}
                      openCell={this.open}
                      setFlag={this.flagSet}
                    />
                  );
                })}
              </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  board: state.boardReducer,
  difficult: state.difficultReducer,
  status: state.statusReducer
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
