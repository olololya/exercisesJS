'use strict';

export default class GameModel {

  constructor(rows, cells, bombs) {
    this.numRows = rows;
    this.numCells = cells;
    this.numBombs = bombs;
    this.numClicks = 0;

    this.openCells = new Array(this.numRows);
    this.bombCells = [];
  }

  //GET methods
  getNumRows() { return this.numRows;  }
  getNumCells() { return this.numCells;  }
  getNumBombs() { return this.numBombs;  }
  getNumClicks() { return this.numClicks;  }


  //IS methods
  isOpenCell(x, y) {
    return this.openCells[x][y];
  }

  isBomb(x, y) {
    for (let i = 0; i < this.bombCells.length; i++)
      if (this.bombCells[i].x == x && this.bombCells[i].y == y) return true;
    return false;
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

    if (!this.numBombsAround(x, y))
      this.openNeighboringCells(x, y);
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
              if (!this.isOpenCell(n, m) && !this.isBomb(n, m)) {
                this.openCell(n, m);
              }
  }

  startGame() {
    //init openCells
    for (let i = 0; i < this.numRows; i++) {
      this.openCells[i] = new Array(this.numCells);
      for (let j = 0; j < this.numCells; j++) {
        this.openCells[i][j] = false;
      }
    }
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

  endGame() {
    for (let i = 0; i < this.numRows; i++)
      for (let j = 0; j < this.numCells; j++)
        if (!this.openCells[i][j]) this.openCells[i][j] = true;
  }

}