'use strict';

import './game.css';

module.exports.init = function(diff) {

  setFlagsOnSpan(diff.bombs);

  let table = createTable(diff.row, diff.cell);

  table.onclick = openCell;
  table.oncontextmenu = setFlag;
};

function setFlagsOnSpan(str) {
  let span = document.getElementById('flags');
  span.innerHTML = str;
}

function getFlagsFromSpan() {
  let span = document.getElementById('flags');
  return parseInt(span.innerHTML);
}

function setClicksOnP(str) {
  let p = document.getElementById('clicks');
  p.innerHTML = str;
}

function getClicksFromP() {
  let p = document.getElementById('clicks');
  return parseInt(p.innerHTML);
}

function getNumRowsCells() {
  let table = document.getElementById('table1');
  let trs = table.getElementsByTagName('tr');
  let tds = trs[0].getElementsByTagName('td');

  return [trs.length, tds.length];
}

function createTable(nrows, ncells) {

  let table = document.getElementById('table1');
  if (table) {
    document.body.removeChild(table);
    document.body.removeChild(document.getElementById('clicks'));
  }

  table = document.createElement('table');
  table.setAttribute('id', 'table1');
  table.setAttribute('border', '1');
  table.setAttribute('align', 'center');
  table.setAttribute('cellspacing', '0');
  table.setAttribute('border-collapse', 'collapse');
  table.setAttribute('cols', ncells);

  for (let i = 0; i < nrows; i++) {
    let row = table.insertRow(i);
    for (let j = 0; j < ncells; j++) {
      let cell = row.insertCell(j);
      cell.setAttribute('id', `${i} ${j}`);
      cell.setAttribute('class', 'close');
    }
  }

  document.body.appendChild(table);

  let p = document.createElement('p');
  p.setAttribute('id', 'clicks');
  p.innerHTML = 0;

  document.body.appendChild(p);

  return table;
}

function getCells() {
  let table = document.getElementById('table1');
  let cells = (table) ? table.getElementsByTagName('td') : null;
  if (!cells) throw new Error('Table is not found');
  return cells;
}

function generateBombs(id) {
  let nbombs = getFlagsFromSpan();

  let cells = getCells();
  let [i, j] = id.split(' ');

  while (nbombs > 0) {
    for (let cell of cells) {
      if (nbombs === 0) break;
      let [n, m] = cell.id.split(' ');
      if (i === n && j === m) continue;
      if (!cell.classList.contains('bomb') && generateChance()) {
        cell.classList.add('bomb')
        nbombs--;
      }
    }
  }

  function generateChance() {
    let chance = Math.random() * 100;
    if (chance <= 5) return true;
    else return false;
  }
}

function generateNumbers() {
  let [nrows, ncells] = getNumRowsCells();
  let cells = getCells();

  for (let cell of cells) {
    if (cell.classList.contains('bomb')) {
      let [i, j] = cell.id.split(' ');
      i = parseInt(i);
      j = parseInt(j);
      for (let n = i - 1; n <= i + 1; n++) {
        if (n >= 0 && n < nrows) {
          for (let m = j - 1; m <= j + 1; m++) {
            if (m >= 0 && m < ncells) {
              if (n == i && m == j) continue;
              else {
                let cell_num = document.getElementById(`${n} ${m}`);
                if (!cell_num.classList.contains('bomb')) {
                  let text = cell_num.innerHTML;
                  if (text) text++;
                  else text = 1;
                  cell_num.innerHTML = text;
                }
              }
            }
          }
        }
      }
    }
  }
}

function openCell() {
  let td = event.target;
  if (td.tagName == 'TD') {
    let num_clicks = getClicksFromP();
    if (num_clicks === 0) {
      generateBombs(td.id);
      generateNumbers();
    }
    if (td.classList.contains('open')) return;
    if (td.classList.contains('flag')) {
      td.classList.remove('flag');
    }
    if (!td.classList.contains('bomb')) {
      td.classList.remove('close');
      td.classList.add('open');
      num_clicks++;
      setClicksOnP(num_clicks);
      if (getFlagsFromSpan() === 0) isWin();
      if (!td.innerHTML) fillOpen(td.id);
    } else {
      setFlagsOnSpan('YOU LOSE');
      endGame();
    }
  }
}

function setFlag() {
  let td = event.target;
  event.preventDefault();
  if (td.tagName == 'TD') {
    let num_clicks = getClicksFromP();
    if (num_clicks === 0) return;
    let num_flags = getFlagsFromSpan();
    if (td.classList.contains('open')) return;
    if (td.classList.contains('flag')) {
      td.classList.remove('flag');
      num_flags++;
    } else {
      if (num_flags > 0) {
        td.classList.add('flag');
        num_flags--;
      }
    }
    setFlagsOnSpan(num_flags);
    if (num_flags === 0)
      isWin();
  }
}

function fillOpen(id) {
  let [nrows, ncells] = getNumRowsCells();

  let [i, j] = id.split(' ');
  i = parseInt(i);
  j = parseInt(j);

  for (let n = i - 1; n <= i + 1; n++) {
    if (n >= 0 && n < nrows) {
      for (let m = j - 1; m <= j + 1; m++) {
        if (m >= 0 && m < ncells) {
          if (n === i && m === j) continue;
          else {
            let cell_num = document.getElementById(`${n} ${m}`);
            if (!cell_num.classList.contains('bomb') && !cell_num.classList.contains('flag') && !cell_num.classList.contains('open')) {
              cell_num.classList.remove('close');
              cell_num.classList.add('open');
              if (!cell_num.innerHTML)
                fillOpen(`${n} ${m}`);
            }
          }
        }
      }
    }
  }
  if (getFlagsFromSpan() === 0) isWin();
}

function isWin() {
  let cells = getCells();
  let flag = true;
  for (let cell of cells) {
    if (cell.classList.contains('close') && !cell.classList.contains('flag'))
      return;
  }
  setFlagsOnSpan('YOU WIN');

  endGame();
}

function endGame() {
  let table = document.getElementById('table1');
  table.onclick = function(){};
  table.oncontextmenu = function(){};

  let cells = getCells();
  for (let cell of cells) {
    cell.classList.remove('close');
    if (cell.classList.contains('flag') && cell.classList.contains('bomb')) {
      cell.classList.remove('flag');
      cell.classList.remove('bomb');
      cell.classList.add('flag-bomb');
    }
    if (!cell.classList.contains('bomb')) {
      cell.classList.add('open');
    }
  }
}