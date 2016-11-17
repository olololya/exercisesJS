'use strict';

import './reset.css';
import './game.css';
import './head.css';
import Model from './Model/GameModel.js';
import Controller from './Controller/GameController.js';
import WindowView from './View/WindowView.js';

(function() {
  let diff = [
    { row: 10, cell: 10, bombs: 10 },  //easy
    { row: 15, cell: 15, bombs: 30 },  //normal
    { row: 15, cell: 25, bombs: 50 }   //hard
  ];

  let model = null;
  let views = [];
  let buttonStart = document.getElementById('button-start');
  buttonStart.onclick = () => {
    let num = getNumViews();
    if (num) {
      model = new Model(getDifficult().row, getDifficult().cell, getDifficult().bombs);
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
    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++)
      if (inputs[i])
        if (inputs[i].checked)
          return diff[i];
    return diff[0];
  }
})();



