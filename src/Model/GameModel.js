'use strict';

import CellChangeEvent from '../Event/CellChangeEvent.js';
import StatusChangeEvent from '../Event/StatusChangeEvent.js';

export default class GameModel {

  constructor(rows, cells, bombs) {
    this.numRows = rows;
    this.numCells = cells;
    this.numBombs = bombs;
    this.numClicks = 0;
    this.numFreeFlags = bombs;

    this.openCells = new Array(this.numRows);
    this.bombCells = [];
    this.flagCells = [];

    this.STATUS_WIN = 'win';
    this.STATUS_LOSE = 'lose';
    this.STATUS_PLAYING = 'playing';

    this.statusGame = '';

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

  openCell(x, y) {
    this.openCells[x][y] = true;

    let event = new CellChangeEvent(x, y);
    this.dispatchEvent(event);

    if (!this.numBombsAround(x, y) && !this.isFlag(x, y))
      this.openNeighboringCells(x, y);

    if (this.numFreeFlags === 0) this.isWin();
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
    this.flagCells.push({
      x: x,
      y: y
    });
    this.numFreeFlags--;

    let event = new CellChangeEvent(x, y);
    this.dispatchEvent(event);
    if (this.numFreeFlags === 0) this.isWin();
  }

  delFlag(x, y) {
    let ind = 0;
    for (let i = 0; i < this.flagCells.length; i++)
      if (this.flagCells[i].x == x && this.flagCells[i].y == y) ind = i;

    this.flagCells.splice(ind, 1);
    this.numFreeFlags++;
    let event = new CellChangeEvent(x, y);
    this.dispatchEvent(event);
  }


  startGame() {
    //init openCells
    for (let i = 0; i < this.numRows; i++) {
      this.openCells[i] = new Array(this.numCells);
      for (let j = 0; j < this.numCells; j++) {
        this.openCells[i][j] = false;
      }
    }
    this.statusGame = this.STATUS_PLAYING;

    let event = new StatusChangeEvent(this.statusGame);
    this.dispatchEvent(event);
  }

  reloadGame(rows, cells, bombs) {
    this.numRows = rows;
    this.numCells = cells;
    this.numBombs = bombs;
    this.numClicks = 0;
    this.numFreeFlags = bombs;

    this.openCells = new Array(this.numRows);
    this.bombCells = [];
    this.flagCells = [];

    this.listeners = {};
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
        if (!this.openCells[i][j]) this.openCells[i][j] = true;
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
    var listenerArray = this.listeners[event.type];
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