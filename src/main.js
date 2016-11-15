'use strict';

import './main.css';

import Board from './boardClass';

(function() {

  let boards = [];

  let header = document.createElement('header');
  document.body.appendChild(header);

  let button = document.createElement('button');
  button.setAttribute('id', 'button-create');
  button.innerHTML = 'Create board';
  header.appendChild(button);
  button.addEventListener('click', function() {
    boards.push(new Board(boards.length));
    boards[boards.length - 1].drawRect();
  });

  let container = document.createElement('div');
  container.setAttribute('id', 'container');
  document.body.appendChild(container);

  container.addEventListener('click', function() {
    if (event.target.tagName === 'CANVAS') {
      for (let board of boards) {
        if (board.id == event.target.id) {
          board.addFigure();
          board.draw();
        }
      }
    }
  });

})();

