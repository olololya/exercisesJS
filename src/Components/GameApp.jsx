import React, { Component } from 'react';

import Board from './Board';
import Difficult from './Difficult';
import Status from './Status';

const DIFFICULT = {
  easy: {
    rows: 10,
    cols: 10,
    bombs: 10 },
  normal: {
    rows: 15,
    cols: 15,
    bombs: 30 },
  hard: {
    rows: 20,
    cols: 20,
    bombs: 50 } };

const STATUS_GAME = {
  nostart: 'nostart',
  playing: 'playing',
  lose: 'lose',
  win: 'win' };

class GameApp extends Component {

  static generateBomb({ rows, cols, bombs }) {
    function generateChance() {
      const chance = Math.random() * 100;
      if (chance <= 5) return true;
      return false;
    }
    let numBombs = bombs;
    const bombCellsLocal = [];
    while (numBombs > 0) {
      for (let i = 1; i <= rows; i += 1) {
        if (numBombs === 0) break;
        for (let j = 1; j <= cols; j += 1) {
          if (bombCellsLocal.indexOf(`${i} ${j}`) === -1) {
            if (generateChance()) {
              bombCellsLocal.push(`${i} ${j}`);
              numBombs -= 1;
            }
          }
          if (numBombs === 0) break;
        }
      }
    }
    return bombCellsLocal;
  }

  constructor() {
    super();
    this.state = {
      statusGame: STATUS_GAME.nostart };
  }

  getBoard = () => {
    if (this.state.statusGame !== STATUS_GAME.nostart) {
      return (
        <Board
          numRows={this.state.currDiff.rows}
          numCols={this.state.currDiff.cols}
          openCells={this.state.openCells.join()}
          openCell={this.openCell}
          getInner={this.getInner}
          isBomb={this.isBomb}
          isFlag={this.isFlag}
          setFlag={this.setFlag}
        />
      );
    }
    return false;
  };

  getInner = (id) => {
    let num = 0;
    let [x, y] = id.split(' ');
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    for (let n = x - 1; n <= x + 1; n += 1) {
      if (n >= 1 && n <= this.state.currDiff.rows) {
        for (let m = y - 1; m <= y + 1; m += 1) {
          if (m >= 1 && m <= this.state.currDiff.cols) {
            if (n !== x || m !== y) {
              if (this.isBomb(`${n} ${m}`)) num += 1;
            }
          }
        }
      }
    }
    return num;
  };

  setFlag = (id) => {
    if (this.state.statusGame !== STATUS_GAME.playing) return;
    if (this.isOpenCell(id)) return;

    let numFlagsLocal = this.state.numFlags;
    const flagCellsLocal = this.state.flagCells;

    if (this.isFlag(id)) {
      const ind = flagCellsLocal.indexOf(id);
      flagCellsLocal.splice(ind, 1);
      numFlagsLocal += 1;
    } else {
      if (numFlagsLocal === 0 || (this.isBomb(id) && this.isOpenCell(id))) return;
      flagCellsLocal.push(id);
      numFlagsLocal -= 1;
    }
    this.setState({
      flagCells: flagCellsLocal,
      numFlags: numFlagsLocal });

    if (numFlagsLocal === 0) this.isWin();
  };

  isOpenCell = id =>
    (this.state.openCells.indexOf(id) !== -1);

  isFlag = id =>
    (this.state.flagCells.indexOf(id) !== -1);

  isBomb = id =>
    (this.state.bombCells.indexOf(id) !== -1);

  openNeighboringCells = (id) => {
    let [x, y] = id.split(' ');
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    for (let n = x - 1; n <= x + 1; n += 1) {
      if (n >= 1 && n <= this.state.currDiff.rows) {
        for (let m = y - 1; m <= y + 1; m += 1) {
          if (m >= 1 && m <= this.state.currDiff.cols) {
            if (n !== x || m !== y) {
              const id2 = `${n} ${m}`;
              if (!this.isOpenCell(id2) && !this.isBomb(id2) && !this.isFlag(id2)) {
                this.openCell(id2);
              }
            }
          }
        }
      }
    }
  };

  changeDifficult = value =>
    this.setState({
      currDiff: DIFFICULT[value],
      statusGame: STATUS_GAME.playing,
      numFlags: DIFFICULT[value].bombs,
      openCells: [],
      bombCells: GameApp.generateBomb(DIFFICULT[value]),
      flagCells: [] });

  openCell = (id) => {
    if (this.state.statusGame !== STATUS_GAME.playing) return;
    if (this.isFlag(id)) this.setFlag(id);

    const openCellsLocal = this.state.openCells;
    if (this.isOpenCell(id)) return;
    openCellsLocal.push(id);

    this.setState({ openCells: openCellsLocal });

    if (this.isBomb(id)) {
      this.setState({
        statusGame: STATUS_GAME.lose });
      this.endGame();
      return;
    }

    if (!this.getInner(id) && !this.isFlag(id)) {
      this.openNeighboringCells(id);
    }

    if (this.state.numFlags === 0) this.isWin();
  };

  isWin = () => {
    let numOpenCells = this.state.currDiff.rows * this.state.currDiff.cols;
    numOpenCells -= this.state.currDiff.bombs;
    if (this.state.openCells.length === numOpenCells) {
      this.setState({
        statusGame: STATUS_GAME.win });
      this.endGame();
    }
  };

  endGame = () => {
    const openCellsLocal = this.state.openCells;
    for (let i = 1; i <= this.state.currDiff.rows; i += 1) {
      for (let j = 1; j <= this.state.currDiff.cols; j += 1) {
        const id = `${i} ${j}`;
        if (!this.isOpenCell(id)) openCellsLocal.push(id);
      }
    }
    this.setState({
      openCells: openCellsLocal });
  };

  render() {
    return (
      <div>
        <div className="header">
          <Difficult changeDiff={this.changeDifficult} />
          <Status numFlags={this.state.numFlags} statusGame={this.state.statusGame} />
        </div>
        <div>
          {this.getBoard()}
        </div>
      </div>
    );
  }
}

export default GameApp;
