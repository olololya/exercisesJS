'use strict';

import './reset.css';


(function() {

  let diff = [
    { row: 10, cell: 10, bombs: 10 },  //easy
    { row: 15, cell: 15, bombs: 30 },  //normal
    { row: 15, cell: 25, bombs: 50 }   //hard
  ];


  let form = require('./head.js');
  let button = form.init(getDifficult());

  button.addEventListener('click', function() {
    require.ensure([], function (require) {
      let game = require('./game');
      game.init(getDifficult());
    });
  });

  function getDifficult() {
    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++)
      if (inputs[i])
        if (inputs[i].checked)
          return diff[i];
    return diff[0];
  }


})();

