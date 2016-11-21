'use strict';

import OpenCommand from '../Command/OpenCommand.js';
import FlagCommand from '../Command/FlagCommand.js';

export default class GameConsoleController {

  constructor(model, viewCons) {
    this.model = model;
    this.viewCons = viewCons;
    this.history = null;
  }

  show() {
    this.viewCons.show();
  }

  prov(y, x) {
    if (isNaN(parseInt(y))) throw new Error('x not a number');
    if (isNaN(parseInt(x))) throw new Error('y not a number');
    if (x >= this.model.getNumRows()) throw new Error(`Max y - ${this.model.getNumRows()}`);
    if (y >= this.model.getNumCells()) throw new Error(`Max x - ${this.model.getNumCells()}`);
    if (x < 0) throw new Error('Min y - 1');
    if (y < 0) throw new Error('Min x - 1');
    return true;
  }

  open(y, x) {
    y--;
    x--;
    this.prov(y, x);

    if (this.model.getNumClicks() == 0) {
      this.model.generateBomb(x, y);
    }
    if (!this.model.isOpenCell(x, y)) {
      if (this.model.isFlag(x, y))
        this.model.delFlag(x, y);
      this.history = new OpenCommand(this.model, x, y);
      this.history.execute();
      if (this.model.isBomb(x, y))
        this.model.endGame('lose');
      this.model.setClick();
      return `Open cell ${y+1} ${x+1}`;
    } else throw new Error('This cell is already open');
  }


  setFlag(y, x) {
    y--;
    x--;
    this.prov(y, x);

    if (this.model.getNumClicks() == 0) throw new Error('Can\'t set flag -  make the first click');
    if (this.model.isOpenCell(x, y)) throw new Error('This cell is already open');
    if (!this.model.isFlag(x, y)) {
      if (this.model.getNumFlags() !== 0) {
        this.history = new FlagCommand(this.model, x, y, 'set');
        this.history.execute();
      } else throw new Error('You don\'t have flags');
    } else throw new Error('This cell already has a flag');
  }

  removeFlag(y, x) {
    y--;
    x--;
    this.prov(y, x);

    if (this.model.getNumClicks() == 0) return;
    if (this.model.isFlag(x, y)) {
      this.history = new FlagCommand(this.model, x, y, 'del');
      this.history.execute();
      return `Remove flag from ${y+1} ${x+1}`;
    } else throw new Error('This cell is not the flag');
  }

  resign() {
    if (this.model.getStatusGame() === 'playing') {
      this.model.endGame('lose');
    } else throw new Error('Game not run');
  }

  start() {
    this.model.reloadGame('easy');
    this.model.startGame();
  }

  setDiff(diff) {
    if (diff === 'easy' || diff === 'normal' || diff === 'hard') {
      this.model.reloadGame(diff);
      this.model.startGame();
    } else throw new Error('Wrong difficult');
  }

  cancel() {
    if (this.history) {
      if (this.model.getNumClicks() != 0)
        this.history.cancel();
      return 'Canceled successfully';
    } else throw new Error('Nothing to cancel');
  }

  help() {
    this.viewCons.showHelp();
  }

}