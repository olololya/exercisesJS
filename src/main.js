'use strict';

(function createTable(num_row = 5, num_cell = 5) {

  let table = document.createElement('table');
  table.setAttribute('border', '1');
  table.setAttribute('align', 'center');
  table.setAttribute('cellspacing', '0');
  table.setAttribute('border-collapse', 'collapse');
  table.setAttribute('cols', num_cell);

  for (let i = 0; i < num_row; i++) {
    let row = table.insertRow(i);
    for (let j = 0; j < num_cell; j++) {
      let cell = row.insertCell(j);
      cell.width = '28px';
      cell.height = '28px';
      cell.style.backgroundColor = '#fff';
    };
  };

  document.body.appendChild(table);
})();