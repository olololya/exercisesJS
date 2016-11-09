'use strict';

module.exports.create = function(num_row = 10, num_cell = 10) {

  clear();

  let table = document.createElement('table');
  table.setAttribute('id', 'table1');
  table.setAttribute('border', '1');
  table.setAttribute('align', 'center');
  table.setAttribute('cellspacing', '0');
  table.setAttribute('border-collapse', 'collapse');
  table.setAttribute('cols', num_cell);

  for (let i = 0; i < num_row; i++) {
    let row = table.insertRow(i);
    for (let j = 0; j < num_cell; j++) {
      let cell = row.insertCell(j);
      cell.setAttribute('class', 'white');
    };
  };

  document.body.appendChild(table);

  table.addEventListener('click', function() {
    console.log('dsg');
    if (event.target.tagName == 'TD') {

      if (event.target.className === 'white') event.target.className = 'black';
      else event.target.className = 'white';
    };
  });

  createButton();
};

function createButton() {
  let button = document.createElement('button');
  button.setAttribute('id', 'but3');
  button.innerHTML = 'Change color';

  document.body.appendChild(button);

  button.addEventListener('click', function() {
    let table = document.getElementById('table1');
    let tds = table.getElementsByTagName('td');

    for (let i = 0; i < tds.length; i++) {
      if (tds[i]) {
        if (tds[i].className === 'white') tds[i].className = 'black';
        else tds[i].className = 'white';
      };
    };
  });
};

function clear() {
  let table = document.getElementById('table1');
  if (table) {
    document.body.removeChild(table);
    document.body.removeChild(document.getElementById('but3'));
  }
};

module.exports.clear = clear;
