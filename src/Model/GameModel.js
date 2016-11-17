'use strict';

export default class GameModel {

  constructor(rows, cells, bombs) {
    this.numRows = rows;
    this.numCells = cells;
    this.numBombs = bombs;

    this.openCells = new Array(this.numRows);
    for (let i = 0; i < this.numRows; i++) {
      this.openCells[i] = new Array(this.numCells);
      for (let j = 0; j < this.numCells; j++)
        this.openCells[i][j]  = false;
    }
  }


  getNumRows() { return this.numRows;  }
  getNumCells() { return this.numCells;  }
  getNumBombs() { return this.numBombs;  }

  isOpenCell(x, y) {
    return this.openCells[x][y];
  }

  openCell(x, y) {
    this.openCells[x][y] = true;
  }

}