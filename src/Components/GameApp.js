import React, { Component } from 'react';

import Board from './Board';

let difficult = [
  {
    name: 'easy',
    rows: 10,
    cols: 10,
    bombs: 10
  }, {
    name: 'normal',
    rows: 15,
    cols: 15,
    bombs: 30
  }, {
    name: 'hard',
    rows: 20,
    cols: 20,
    bombs: 50
  }
];
let STATUS_GAME = {
  play: 'play',
  win: 'win',
  lose: 'lose'
};

class GameApp extends Component {
  constructor() {
    super();
    this.state = {
      currDiff: difficult[0],
      statusGame: null,
      numFlags: difficult[0].bombs,
      numClicks: 0,
      openCells: [],
      bombCells: [],
      flagCells: []
    };
    this.openCell = this.openCell.bind(this);
    this.isBomb = this.isBomb.bind(this);
    this.isFlag = this.isFlag.bind(this);
    this.getInner = this.getInner.bind(this);
    this.generateBomb = this.generateBomb.bind(this);
  }

  openCell(id) {
    let clicks = this.state.numClicks;
    let openCells = [];
    if (clicks == 0) {
      this.generateBomb(id);
    }

    if (this.state.openCells.indexOf(id) != -1) return;
    openCells.push(id);
    clicks++;
    this.setState({
      numClicks: clicks,
      openCells: openCells
    });
  }

  getInner(id) {

  }

  isFlag(id) {
    if (this.state.flagCells.indexOf(id) != -1) return true;
    return false;
  }

  isBomb(id) {
    if (this.state.bombCells.indexOf(id) != -1) return true;
    return false;
  }

  render() {
    let numRows = this.state.currDiff.rows;
    let numCols = this.state.currDiff.cols;
    let numBombs = this.state.currDiff.bombs;

    return (
      <Board numRows={numRows}
             numCols={numCols}
             openCell={this.openCell.bind(this)}
             getInner={this.getInner.bind(this)}
             isBomb={this.isBomb.bind(this)}
             isFlag={this.isFlag.bind(this)}
      />
    );
  }

  generateBomb(id) {
    let [x, y] = id.split(' ');
    x = parseInt(x);
    y = parseInt(y);
    let bombs = this.state.currDiff.bombs;
    let bombCells = [];
    while (bombs > 0) {
      for (let i = 0; i < this.state.currDiff.rows; i++) {
        if (bombs === 0) break;
        for (let j = 0; j < this.state.currDiff.cols; j++) {
          if (i === x && j === y) continue;
          if (generateChance() && !this.isBomb(i + ' ' + j)) {
            bombCells.push(i + ' ' + j);
            bombs--;
          }
          if (bombs === 0) break;
        }
      }
    }

    this.setState({
      bombCells: bombCells
    });

    console.log('bombs', bombCells);
    function generateChance() {
      let chance = Math.random() * 100;
      if (chance <= 5) return true;
      else return false;
    }
  }
}



export default GameApp;