'use strict';

import './main.css';

import Board from './classes/Board';

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



  let labels = new Array(2);
  let radios = new Array(2);
  let label_text = ['circle', 'square'];
  let id_radios = ['circle', 'square'];

  for (let i = 0; i < labels.length; i++) {
    radios[i] = document.createElement('input');
    radios[i].setAttribute('type', 'radio');
    radios[i].setAttribute('id', id_radios[i]);
    radios[i].setAttribute('name', 'type-figure');
    if (i === 0) radios[i].setAttribute('checked', 'true');
    header.appendChild(radios[i]);

    labels[i] = document.createElement('label');
    labels[i].setAttribute('for', id_radios[i]);
    labels[i].innerHTML = label_text[i];
    header.appendChild(labels[i]);
  }

  let container = document.createElement('div');
  container.setAttribute('id', 'container');
  document.body.appendChild(container);

  container.addEventListener('click', function() {
    if (event.target.tagName === 'CANVAS') {
      let type = null;
      let inputs = document.getElementsByTagName('input');
      for (let input of inputs)
          if (input.checked) type = input.id;
      for (let board of boards) {
        if (board.id == event.target.id) {
          board.addFigure(type);
          board.draw();
        }
      }
    }
  });

})();

