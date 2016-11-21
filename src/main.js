'use strict';

import './reset.css';
import './game.css';
import './head.css';
import Model from './Model/GameModel.js';
import Controller from './Controller/GameController.js';
import ConsoleController from './Controller/GameConsoleController.js';
import WindowView from './View/WindowView.js';
import ConsoleView from './View/ConsoleView.js';

let model = new Model('easy');
let game = new ConsoleController(model, new ConsoleView(model));
let views = [];

let buttonStart = document.getElementById('button-start');
buttonStart.onclick = () => {
  let num = getNumViews();
  if (num) {

    model.reloadGame(getDifficult());
    for (let i = 0; i < num; i++)
      views.push(new WindowView(model));

    let controller = new Controller(model, views);
    controller.init();

  } else {
    alert('Error num of views! Min = 1, max = 9');
  }

};

function getNumViews() {
  let num = document.getElementById('num-views').value;
  if (num > 0 && num < 10) return num;
  return false;
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

export { game };
