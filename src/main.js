'use strict';

import './reset.css';
import './main.css';

(function init() {
  let input1 = document.getElementById('row');
  let input2 = document.getElementById('cell');

  let button_clear = document.getElementById('but2');
  button_clear.addEventListener('click', function() {
    clearInputs(input1, input2);
  });

  let button_create = document.getElementById('but1');
  button_create.addEventListener('click', function() {
    if (input1.value > 15 || input2.value > 15) {
      alert('Max number of row and cell - 15');
    } else {
      require.ensure(['./table'], function (require) {
        let table = require('./table');

        let row = input1.value;
        let cell = input2.value;

        if (isNaN(parseInt(row)) || row <= 0) row = undefined;
        if (isNaN(parseInt(cell)) || cell <= 0) cell = undefined;

        table.create(row, cell);

        button_clear.addEventListener('click', function() {
          table.clear();
        });
      });
    }
  });

})();

function clearInputs(inp1, inp2) {
  inp1.value = '';
  inp2.value = '';
};