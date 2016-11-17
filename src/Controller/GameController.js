'use strict';

import WindowView from '../View/WindowView.js';

export default class GameController {

  constructor(model, views) {
    this.model = model;
    this.views = views;
  }

  init() {
    let buttonStart = document.getElementById('button-start');
    buttonStart.onclick = () => {
      this.model.reloadGame(getDifficult().row, getDifficult().cell, getDifficult().bombs);
      let num = getNumViews();
      if (num && num != this.views.length) {
        let i = Math.abs(num - this.views.length);
        if (num < this.views.length) {
          while (i != 0) {
            this.views[this.views.length - 1].deleteTable();
            this.views.pop();
            i--;
          }
        } else {
          while (i != 0) {
            this.views.push(new WindowView(this.model));
            i--;
          }
        }
      }
      this.reloadViews(true);
      this.initEvents();
    };

    this.initEvents();
    this.model.startGame();

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
          this.reloadViews();
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

        this.reloadViews();
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