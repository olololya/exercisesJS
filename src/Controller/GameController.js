'use strict';

import WindowView from '../View/WindowView.js';

export default class GameController {

  constructor(model, views) {
    this.model = model;
    this.views = views;
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
      this.model.reloadGame(getDifficult().row, getDifficult().cell, getDifficult().bombs);
      for (let i = 0; i < num; i++) {
        this.views[i] = new WindowView(this.model);
      }
      this.model.startGame();
      this.initEvents();
    };
  }


  initEvents() {
    for (let i = 0; i < this.views.length; i++) {
      //onclick cell
      this.views[i].setClickCell((x, y) => {
        if (this.model.getNumClicks() == 0) {
          this.model.generateBomb(x, y);
          this.views[0].showBombs();
        }
        if (!this.model.isOpenCell(x, y)) {
          if (this.model.isFlag(x, y))
            this.model.delFlag(x, y);
          if (!this.model.isBomb(x, y))
            this.model.openCell(x, y);
          else this.model.endGame('lose');
        }
        this.model.setClick();
      });
      //oncontextmenu cell
      this.views[i].setContextmenuClickCell((x, y) => {
        if (this.model.getNumClicks() == 0) return;
        if (this.model.isFlag(x, y)) this.model.delFlag(x, y);
        else {
          if (this.model.getNumFlags() == 0) return;
          else this.model.setFlag(x, y);
        }
      });
    }
  }

  reloadViews(flag) {
    for (let i = 0; i < this.views.length; i++)
      this.views[i].reload(flag);
  }
}

function getDifficult() {
  let diff = [
    { row: 10, cell: 10, bombs: 10 },  //easy
    { row: 15, cell: 15, bombs: 30 },  //normal
    { row: 15, cell: 25, bombs: 50 }   //hard
  ];
  let inputs = document.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i++)
    if (inputs[i])
      if (inputs[i].checked)
        return diff[i];
  return diff[0];
}

function getNumViews() {
  let num = document.getElementById('num-views').value;
  if (num > 0 && num < 11) return num;
  return false;
}