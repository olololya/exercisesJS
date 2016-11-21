'use strict';

import CellChangeEvent from '../Event/CellChangeEvent.js';
import StatusChangeEvent from '../Event/StatusChangeEvent.js';

export default class GameModel {

  constructor(diff) {
    this.STATUS_WIN = 'win';
    this.STATUS_LOSE = 'lose';
    this.STATUS_PLAYING = 'playing';
    this.statusGame = '';

    this.DIFF_EASY = {row: 10, cell: 10, bombs: 10};
    this.DIFF_NORMAL = {row: 15, cell: 15, bombs: 30};
    this.DIFF_HARD = {row: 15, cell: 25, bombs: 50};
    this.difficult = {};

    this.setDifficult(diff);

    this.numRows = this.difficult.row;
    this.numCells = this.difficult.cell;
    this.numBombs = this.difficult.bombs;
    this.numClicks = 0;
    this.numFreeFlags = this.difficult.bombs;

    this.openCells = new Array(this.numRows);
    this.bombCells = [];
    this.flagCells = [];

    this.listeners = {};
    this.numListen = 0;
  }

  //GET methods
  getNumRows() { return this.numRows;  }
  getNumCells() { return this.numCells;  }
  getNumBombs() { return this.numBombs;  }
  getNumClicks() { return this.numClicks;  }
  getNumFlags() { return this.numFreeFlags;  }
  getStatusGame() { return this.statusGame; }
  getDifficult() { return this.difficult; }

  //IS methods
  isOpenCell(x, y) {
    return this.openCells[x][y];
  }

  isBomb(x, y) {
    for (let i = 0; i < this.bombCells.length; i++)
      if (this.bombCells[i].x == x && this.bombCells[i].y == y) return true;
    return false;
  }

  isFlag(x, y) {
    for (let i = 0; i < this.flagCells.length; i++)
      if (this.flagCells[i].x == x && this.flagCells[i].y == y) return true;
    return false;
  }

  isWin() {
    for (let i = 0; i < this.numRows; i++)
      for (let j = 0; j < this.numCells; j++) {
        if (this.openCells[i][j] === false && !this.isFlag(i, j)) return;
      }
    this.statusGame = this.STATUS_WIN;
    this.endGame('win');
  }

  numBombsAround(x, y) {
    let num = 0;
    x = parseInt(x);
    y = parseInt(y);
    for (let n = x - 1; n <= x + 1; n++)
      if (n >= 0 && n < this.numRows)
        for (let m = y - 1; m <= y + 1; m++)
          if (m >= 0 && m < this.numCells)
            if (n == x && m == y) continue;
            else
              if (this.isBomb(n, m)) num++;
    return num;
  }

  //SET methods
  setClick() {
    this.numClicks++;
  }

  setDifficult(diff) {
    switch(diff) {
      case 'easy':
        this.difficult = this.DIFF_EASY;
        break;
      case 'normal':
        this.difficult = this.DIFF_NORMAL;
        break;
      case 'hard':
        this.difficult = this.DIFF_HARD;
        break;
    }
  }

  openCell(x, y) {
    this.openCells[x][y] = true;

    let event = new CellChangeEvent(x, y, 'open');
    this.dispatchEvent(event);

    if (!this.numBombsAround(x, y) && !this.isFlag(x, y))
      this.openNeighboringCells(x, y);

    if (this.numFreeFlags === 0) this.isWin();
  }

  closeCell(x, y) {
    this.openCells[x][y] = false;

    let event = new CellChangeEvent(x, y, 'close');
    this.dispatchEvent(event);
  }

  openNeighboringCells(x, y) {
    x = parseInt(x);
    y = parseInt(y);
    for (let n = x - 1; n <= x + 1; n++)
      if (n >= 0 && n < this.numRows)
        for (let m = y - 1; m <= y + 1; m++)
          if (m >= 0 && m < this.numCells)
            if (n === x && m === y) continue;
            else
              if (!this.isOpenCell(n, m) && !this.isBomb(n, m) && !this.isFlag(n, m)) {
                this.openCell(n, m);
              }
  }

  setFlag(x, y) {
    if (this.isOpenCell(x, y)) return;
    this.flagCells.push({
      x: x,
      y: y
    });
    this.numFreeFlags--;

    let event = new CellChangeEvent(x, y, 'setFlag');
    this.dispatchEvent(event);
    if (this.numFreeFlags === 0) this.isWin();
  }

  delFlag(x, y) {
    let ind = 0;
    for (let i = 0; i < this.flagCells.length; i++)
      if (this.flagCells[i].x == x && this.flagCells[i].y == y) ind = i;

    this.flagCells.splice(ind, 1);
    this.numFreeFlags++;
    let event = new CellChangeEvent(x, y, 'delFlag');
    this.dispatchEvent(event);
  }

  startGame() {
    for (let i = 0; i < this.numRows; i++) {
      this.openCells[i] = new Array(this.numCells);
      for (let j = 0; j < this.numCells; j++) {
        this.closeCell(i, j);
      }
    }
    this.statusGame = this.STATUS_PLAYING;

    let event = new StatusChangeEvent(this.statusGame);
    this.dispatchEvent(event);
  }

  reloadGame(diff) {
    this.setDifficult(diff);

    this.numRows = this.difficult.row;
    this.numCells = this.difficult.cell;
    this.numBombs = this.difficult.bombs;
    this.numClicks = 0;
    this.numFreeFlags = this.difficult.bombs;

    this.openCells = new Array(this.numRows);
    this.bombCells = [];
    this.flagCells = [];
  }

  generateBomb(x, y) {
    x = parseInt(x);
    y = parseInt(y);
    let bombs = this.numBombs;
    while (bombs > 0) {
      for (let i = 0; i < this.numRows; i++) {
        if (bombs === 0) break;
        for (let j = 0; j < this.numCells; j++) {
          if (i === x && j === y) continue;
          if (generateChance() && !this.isBomb(i , j)) {
            this.bombCells.push({
              x: i,
              y: j
            });
            bombs--;
          }
          if (bombs === 0) break;
        }
      }
    }

    function generateChance() {
      let chance = Math.random() * 100;
      if (chance <= 5) return true;
      else return false;
    }
  }

  endGame(status) {
    if (status === 'lose')
      this.statusGame = this.STATUS_LOSE;
    if (status === 'win')
      this.statusGame = this.STATUS_WIN;

    for (let i = 0; i < this.numRows; i++)
      for (let j = 0; j < this.numCells; j++)
        if (!this.isOpenCell(i, j)) this.openCell(i, j);
    let event = new StatusChangeEvent(this.statusGame);
    this.dispatchEvent(event);
  }

  addEventListener(type, listener) {
    if (this.listeners[type] === undefined)
      this.listeners[type] = [];
    if (this.listeners[type].indexOf(listener) === - 1 ) {
      this.listeners[type].push(listener);
      this.numListen++;
    }
  }

  dispatchEvent(event) {
    let listenerArray = this.listeners[event.type];
    if (listenerArray) {
      event.target = this;
      let array = [], i = 0;
      let length = listenerArray.length;
      for (let i = 0; i < length; i++ ) {
        array[i] = listenerArray[i];
      }
      for (let i = 0; i < length; i++ ) {
        array[i].call(this, event);
      }
    }
  }

}