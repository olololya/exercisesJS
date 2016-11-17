'use strict';

import Model from '../Model/GameModel.js';

export default class WindowView {

  constructor(model) {
    this.model = model;
    this.container = document.getElementById('container');
    this.cells = [];
    this.span = document.getElementById('flags');
    this.createTable();
  }

  setClickCell(func) {
    this.table.onclick = () => {
      if (event.target.tagName == 'TD') {
        let [x, y] = event.target.id.split(' ');
        func(x, y);
        this.span.innerHTML = this.model.getNumFlags();
      }
    }
  }

  setContextmenuClickCell(func) {
    this.table.oncontextmenu = () => {
      event.preventDefault();
      if (event.target.tagName == 'TD') {
        let [x, y] = event.target.id.split(' ');
        func(x, y);
        this.span.innerHTML = this.model.getNumFlags();
      }
    }
  }

  reload(flag) {
    if (flag) {
      this.cells = [];
      this.container.removeChild(this.table);
      this.createTable();
    } else {
      for (let cell of this.cells) {
        let [x, y] = cell.id.split(' ');
        if (this.model.isOpenCell(x, y)) {
          if (!cell.classList.contains('open')) {
            cell.classList.add('open');
            cell.classList.remove('close');
          }
          if (this.model.isBomb(x, y)) {
            if (this.model.isFlag(x, y)) cell.classList.add('flag-bomb');
            else cell.classList.add('bomb');
          }
          else {
            if (this.model.numBombsAround(x, y))
              cell.innerHTML = this.model.numBombsAround(x, y);
          }
        } else {
          if (this.model.isFlag(x, y)) {
            if (!cell.classList.contains('flag'))
              cell.classList.add('flag')
          } else {
            if (cell.classList.contains('flag'))
              cell.classList.remove('flag')
          }

        }
      }
      if (this.model.getStatusGame() === 'win') this.span.innerHTML = 'YOU WIN';
      if (this.model.getStatusGame() === 'lose') this.span.innerHTML = 'YOU LOSE';
    }
  }

  deleteTable() {
    this.container.removeChild(this.table);
  }

  createTable() {
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
    this.container.appendChild(this.table);
    this.span.innerHTML = this.model.getNumFlags();
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