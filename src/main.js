'use strict';

import './reset.css';
import './main.css';

import Board from './classes/Board';

(function() {

  let boards = [];

  let button = document.getElementById('button-create');
  button.addEventListener('click', function() {
    let inp_color = document.getElementById('board-color');
    let inp_width = document.getElementById('board-width');
    inp_width = parseInt(inp_width.value);
    if (!isNaN(inp_width)) {
      if (inp_width < 200 || inp_width > 500) {
        alert('Error width board! Min = 200, max = 500');
        return;
      }
    }
    let inp_height = document.getElementById('board-height');
    inp_height = parseInt(inp_height.value);
    if (!isNaN(inp_height)) {
      if (inp_height < 200 || inp_height > 500) {
        alert('Error height board! Min = 200, max = 500');
        return;
      }
    }

    boards.push(new Board(boards.length, inp_color.value, inp_width, inp_height));
    boards[boards.length - 1].drawRect();
  });

  let container = document.createElement('div');
  container.setAttribute('id', 'container');
  document.body.appendChild(container);

  container.addEventListener('click', function() {
    if (event.target.tagName === 'CANVAS') {
      let type = null;
      let inputs = document.getElementsByTagName('input');
      for (let input of inputs)
          if (input.checked) type = input.id;

      let inp_color = document.getElementById('figure-color');
      let inp_radius = document.getElementById('figure-radius');
      inp_radius = parseInt(inp_radius.value);
      if (!isNaN(inp_radius)) {
        if (inp_radius < 20 || inp_radius > 100) {
          alert('Error radius figure! Min = 20, max = 60');
          return;
        }
      }

      for (let board of boards) {
        if (board.id == event.target.id) {
          board.addFigure(type, inp_color.value, inp_radius);
          board.draw();
        }
      }
    }
  });

})();

