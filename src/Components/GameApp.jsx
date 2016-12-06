import React, { Component } from 'react';

import Board from './Board';

const difficult = [
  { name: 'easy',
    rows: 10,
    cols: 10,
    bombs: 10 },
  { name: 'normal',
    rows: 15,
    cols: 15,
    bombs: 30 },
  { name: 'hard',
    rows: 20,
    cols: 20,
    bombs: 50 }];

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
      currDiff: difficult[0],
      statusGame: null,
      numFlags: difficult[0].bombs,
      openCells: [],
      bombCells: GameApp.generateBomb(difficult[0]),
      flagCells: [] };
    this.openCell = this.openCell.bind(this);
    this.setFlag = this.setFlag.bind(this);
    this.isBomb = this.isBomb.bind(this);
    this.isFlag = this.isFlag.bind(this);
    this.getInner = this.getInner.bind(this);
  }

  getInner(id) {
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
  }

  setFlag(id) {
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
  }

  openCell(id) {
    const openCellsLocal = this.state.openCells;
    if (this.isOpenCell(id)) return;
    openCellsLocal.push(id);

    this.setState({ openCells: openCellsLocal });

    if (!this.getInner(id) && !this.isFlag(id)) {
      this.openNeighboringCells(id);
    }
  }

  isOpenCell(id) {
    return (this.state.openCells.indexOf(id) !== -1);
  }

  isFlag(id) {
    return (this.state.flagCells.indexOf(id) !== -1);
  }

  isBomb(id) {
    return (this.state.bombCells.indexOf(id) !== -1);
  }

  openNeighboringCells(id) {
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
  }

  render() {
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
}

export default GameApp;
