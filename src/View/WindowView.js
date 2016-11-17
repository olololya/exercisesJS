'use strict';

import Model from '../Model/GameModel.js';

export default class WindowView {

  constructor(model) {
    this.model = model;

    this.cells = [];

    this.table = document.createElement('table');
    this.table.align = 'center';
    this.table.cellspacing = '0';
    this.table.borderCollapse = 'collapse';
    this.table.cols = this.model.numCells;
    for (let i = 0; i < this.model.getNumRows(); i++) {
      let row = this.table.insertRow(i);
      for (let j = 0; j < this.model.getNumCells(); j++) {
        let cell = row.insertCell(j);
        cell.id = `${i} ${j}`;
        cell.classList.add('close');
        this.cells.push(cell);
      }
    }
    document.body.appendChild(this.table);

  }

  setClickCell(func) {
    this.table.onclick = function() {
      if (event.target.tagName == 'TD') {
        let [x, y] = event.target.id.split(' ');
        func(x, y);
      }
    }
  }

  reload() {
    for (let cell of this.cells) {
      let [x, y] = cell.id.split(' ');
      if (this.model.isOpenCell(x, y)) {
        if (!cell.classList.contains('open')) {
          cell.classList.add('open');
          cell.classList.remove('close');
        }
        if (this.model.isBomb(x, y))
          cell.classList.add('bomb');
        else {
          if(this.model.numBombsAround(x, y))
            cell.innerHTML = this.model.numBombsAround(x, y);
        }
      }

    }
  }


  //debug
  showBombs() {
    for (let cell of this.cells) {
      let [x, y] = cell.id.split(' ');
      if (this.model.isBomb(x, y))
        console.log('bomb', x, y);
    }
  }

}