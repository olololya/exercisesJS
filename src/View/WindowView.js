'use strict';

import Model from '../Model/GameModel.js';

export default class WindowView {

  constructor(model) {
    this.model = model;
    this.container = document.getElementById('container');
    this.cells = [];
    this.span = document.getElementById('flags');
    this.attach();
    this.createTable();
  }

  attach() {
    let func1 = this.cellChange.bind(this);
    this.model.addEventListener('cellChange', func1);
    let func2 = this.statusChange.bind(this);
    this.model.addEventListener('statusChange', func2);
  }


  statusChange(event) {
    switch(event.status) {
      case 'win':
        this.span.innerHTML = 'YOU WIN';
        break;
      case 'lose':
        this.span.innerHTML = 'YOU LOSE';
        break;
      case 'playing':
        this.span.innerHTML = this.model.getNumFlags();
        break;
    }
  }

  cellChange(event) {
    this.updateCell(event.x, event.y, event.action);
  }

  updateCell(x, y, action) {
    let cell;
    for (cell of this.cells) {
      let [i, j] = cell.id.split(' ');
      if (i == x && j == y) break;
    }
    switch(action) {
      case 'open':
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
        break;
      case 'close':
        cell.classList.remove('bomb');
        cell.classList.remove('flag');
        cell.classList.remove('flag-bomb');
        cell.classList.remove('open');
        cell.classList.add('close');
        cell.innerHTML = '';
        break;
      case 'setFlag':
        if (!cell.classList.contains('flag')) {
          cell.classList.add('flag');
        }
        break;
      case 'delFlag':
        if (cell.classList.contains('flag')) {
          cell.classList.remove('flag');
        }
        break;
    }
      this.span.innerHTML = this.model.getNumFlags();
  }


  setClickCell(func) {
    this.table.onclick = () => {
      if (event.target.tagName == 'TD') {
        let [x, y] = event.target.id.split(' ');
        func(x, y);
      }
    }
  }

  setContextmenuClickCell(func) {
    this.table.oncontextmenu = () => {
      event.preventDefault();
      if (event.target.tagName == 'TD') {
        let [x, y] = event.target.id.split(' ');
        func(x, y);
      }
    }
  }

  deleteTable() {
    this.container.removeChild(this.table);
    this.table = undefined;
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