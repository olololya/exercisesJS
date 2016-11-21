'use strict';

import Model from '../Model/GameModel.js';

export default class ConsoleView {

  constructor(model) {
    this.model = model;
    this.attach();
  }

  attach() {
    let func1 = this.cellChange.bind(this);
    this.model.addEventListener('cellChange', func1);
    let func2 = this.statusChange.bind(this);
    this.model.addEventListener('statusChange', func2);
  }

  statusChange(event) {
    console.log('------------------------------------------');
    switch(event.status) {
      case 'win':
        console.log('YOU WIN');
        break;
      case 'lose':
        console.log('YOU LOSE');
        break;
      case 'playing':
        console.log('Game started');
        console.log(`Field: ${this.model.getDifficult().row} x ${this.model.getDifficult().cell}, bombs: ${this.model.getDifficult().bombs}`);
        console.log('Press main.game.help() for help');
        console.log(`You have a ${this.model.getNumFlags()} free flag(s)`);
        break;
    }
    console.log('------------------------------------------');
  }
  cellChange(event) {
    switch(event.action) {
      case 'setFlag':
        console.log(`You set flag on cell ${+event.y + 1} ${+event.x + 1}`);
        console.log(`You have a ${this.model.getNumFlags()} free flag(s)`);
        break;
      case 'delFlag':
        console.log(`You remove flag from cell ${+event.y + 1} ${+event.x + 1}`);
        console.log(`You have a ${this.model.getNumFlags()} free flag(s)`);
        break;
    }
  }

  showHelp() {
    console.log('main.game');
    console.log('   .setDiff(\'easy\'/\'normal\'/\'hard\') - set difficult: easy 10*10, normal 15*15, hard 15*25');
    console.log('       setDiff start/reload game!');
    console.log('   .start() - start/reload game');
    console.log('   .resign() - resign and lose');
    console.log('   .open(x, y) - open cell on x, y');
    console.log('   .setFlag(x, y) - set flag on x, y');
    console.log('   .removeFlag(x, y) - remove flag from x, y');
    console.log('   .cancel() - cancel last action');
    console.log('   .show() - show field');
  }

  show() {
    let str = '    ';
    for (let i = 1; i <= this.model.numCells; i++) {
      if (i >= 10) str += i + ' ';
      else str += i + '  ';
    }
    console.log(str);

    for (let i = 0; i < this.model.getNumRows(); i++) {
      let str = '';
      if ((i + 1) < 10) str += ' ' + (i + 1) + ': ';
      else str += (i + 1) + ': ';

      for (let j = 0; j < this.model.getNumCells(); j++) {
        if (this.model.isOpenCell(i, j)) {
          if (this.model.isBomb(i, j)) {
            if (this.model.isFlag(i, j)) str += 'F' + '  ';
            else str += 'X' + '  ';
          }
          else {
            if (this.model.numBombsAround(i, j))
              str += this.model.numBombsAround(i, j) + '  ';
            else str += 'o' + '  ';
          }
        } else {
          if (this.model.isFlag(i, j)) str += 'f' + '  ';
          else str += 'c' + '  ';
        }
      }
      console.log(str);
    }
    console.log(' c - close cell;', 'o - open cell;', 'f - flag;', 'X - bomb;', 'F - flag on bomb');
  }
}