'use strict';

import WindowView from '../View/WindowView.js';
import OpenCommand from '../Command/OpenCommand.js';
import FlagCommand from '../Command/FlagCommand.js';

export default class GameController {

  constructor(model, views) {
    this.model = model;
    this.views = views;
    this.history = null;
  }

  init() {
    this.model.startGame();
    this.initEvents();

    let buttonStart = document.getElementById('button-start');
    buttonStart.onclick = () => {
      let num = getNumViews();
      let length = this.views.length;
      for (let i = 0; i < length; i++) {
        this.views[0].deleteTable();
        this.views.shift();
      }
      this.model.reloadGame(getDifficult());
      for (let i = 0; i < num; i++) {
        this.views[i] = new WindowView(this.model);
      }
      this.model.startGame();
      this.initEvents();
    };

    let cancel = document.getElementById('button-cancel');
    cancel.onclick = () => {
      if (this.model.getNumClicks() != 0)
        this.history.cancel();
    }
  }

  initEvents() {
    for (let i = 0; i < this.views.length; i++) {
      //onclick cell
      this.views[i].setClickCell((x, y) => {
        if (this.model.getNumClicks() == 0) {
          this.model.generateBomb(x, y);
          //this.views[0].showBombs();
        }
        if (!this.model.isOpenCell(x, y)) {
          if (this.model.isFlag(x, y))
            this.history = new FlagCommand(this.model, x, y, 'del');
          this.history = new OpenCommand(this.model, x, y);
          this.history.execute();
          if (this.model.isBomb(x, y))
            this.model.endGame('lose');
          this.model.setClick();
          return `Open cell ${x} ${y}`;
        }

      });
      //oncontextmenu cell
      this.views[i].setContextmenuClickCell((x, y) => {
        if (this.model.getNumClicks() == 0) return;
        if (this.model.isFlag(x, y)) {
          this.history = new FlagCommand(this.model, x, y, 'del');
        }
        else {
          if (this.model.getNumFlags() == 0) return;
          else this.history = new FlagCommand(this.model, x, y, 'set');
        }
        this.history.execute();
      });
    }
  }
}

function getDifficult() {
  let diff = ['easy', 'normal', 'hard'];
  let inputs = document.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i++)
    if (inputs[i])
      if (inputs[i].checked)
        return diff[i];
  return diff[0];
}

function getNumViews() {
  let num = document.getElementById('num-views').value;
  if (num > 0 && num < 10) return num;
  return false;
}