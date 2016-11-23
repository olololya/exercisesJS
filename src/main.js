'use strict';

import './stylesheets/calculator.scss';

let flag = false;

let table = document.getElementById('main-table');
let mcontainer = document.getElementById('moperations-container');

mcontainer.onclick = (event) => {
  let span = event.target;
  if (span.tagName == 'SPAN' && !span.classList.contains('disable')) {
    let num = getMemory();
    switch(span.id) {
      case 'm-save':
        setMemory(getCurrNumber());
        removeDisable();
        break;
      case 'm-read':
        setCurrNumber(getMemory());
        break;
      case 'm-clear':
        setMemory(0);
        addDisable();
        break;
      case 'm-plus':
        num = +num + +getCurrNumber();
        setMemory(num);
        removeDisable();
        break;
      case 'm-minus':
        num -= getCurrNumber();
        setMemory(num);
        removeDisable();
        break;
      case 'm-show':
        alert('Текущее сохраненное значение: ' + num);
        break;
    }
    editWidth();
  }
};

function setMemory(num) {
  let memory = document.getElementById('memory');
  memory.value = num;
}
function getMemory() {
  return document.getElementById('memory').value;
}
function addDisable() {
  document.getElementById('m-read').classList.add('disable');
  document.getElementById('m-clear').classList.add('disable');
  document.getElementById('m-show').classList.add('disable');
}
function removeDisable() {
  document.getElementById('m-read').classList.remove('disable');
  document.getElementById('m-clear').classList.remove('disable');
  document.getElementById('m-show').classList.remove('disable');
}

table.onclick = (event) => {
  let td = event.target;
  if (td.tagName == 'TD') {
    if (td.classList.contains('number')) {
      if (flag) {
        setCurrNumber('0');
        setDefaultSize();
      }
      flag = false;
      let currNum = getCurrNumber();
      if (isNotMax(currNum)) {
        if (currNum == '0') currNum = td.innerHTML;
        else currNum += td.innerHTML;
        setCurrNumber(currNum);
      }
    } else {
      let curr = getCurrNumber();
      let prev = getPrevNumber();
      switch(td.id) {
        case 'clear-entry':
          setCurrNumber('0');
          setDefaultSize();
          break;
        case 'clear':
          clear();
          setDefaultSize();
          break;
        case 'clear-left':
          if (curr.length == 2 && curr[0] == '-') curr = 0;
          else curr = curr.slice(0, curr.length - 1);
          if (getCurrNumber() == '') {
            setCurrNumber('0');
            setDefaultSize();
          }
          setCurrNumber(curr);
          break;
        case 'percent':
          if (prev == '') break;
          curr = (prev / 100) * curr;
          setCurrNumber(curr);
          break;
        case 'root':
          curr = Math.sqrt(curr);
          setCurrNumber(curr);
          flag = true;
          break;
        case 'square':
          let mul = 10;
          let div = 10;
          let indC = curr.indexOf('.');
          if (indC != -1) {
            let str = curr.substring(indC + 1);
            mul = Math.pow(10, str.length);
            div = Math.pow(mul, 2);
            curr *= mul;
            curr = Math.pow(parseFloat(curr), 2);
            curr /= div;
          } else {
            curr = Math.pow(parseFloat(curr), 2);
          }
          setCurrNumber(curr);
          flag = true;
          break;
        case 'fraction':
          setCurrNumber(1 / parseFloat(curr));
          flag = true;
          break;
        case 'div':
          clickOperation('/');
          break;
        case 'mul':
          clickOperation('*');
          break;
        case 'minus':
          clickOperation('-');
          break;
        case 'plus':
          clickOperation('+');
          break;
        case 'negative':
          curr = parseFloat(curr);
          if (curr === 0) break;
          if (curr < 0) setCurrNumber(curr.toString().substring(1));
          else setCurrNumber('-' + curr);
          break;
        case 'dot':
          if (curr.indexOf('.') !== -1) break;
          setCurrNumber(curr + '.');
          flag = false;
          break;
        case 'equal':
          equal();
          flag = true;
          break;
      }
    }
    editWidth();
  }
};

function isNotMax(curr) {
  if (curr < Math.pow(10,15)) return true;
  return false;
}

function setDefaultSize() {
  let span = document.getElementById('currNum');
  span.style.fontSize = '50px';
}

function equal() {
  let prev = getPrevNumber();
  let curr = getCurrNumber();
  let oper = getOperation();

  clear();
 // let mul = 0;
  //let div = 0;

  let equal = function(mul, div, prev, curr, oper) {
    let intP = Number.isInteger(+prev);
    let intC = Number.isInteger(+curr);
    if (!intP || !intC) {
      prev *= mul;
      curr *= mul;
      curr = eval(prev + oper + curr);
      curr /= div
    }
    else {
      curr = eval(prev + oper + curr);
    }
    setCurrNumber(curr);
  };
  switch(oper) {
    case '+':
      equal(10, 10, prev, curr, oper);
      break;
    case '-':
      equal(10, 10, prev, curr, oper);
      break;
    case '/':
      equal(10, 1, prev, curr, oper);
      break;
    case '*':
      let mul = 10;
      let div = 10;
      let indC = curr.indexOf('.');
      let indP = prev.indexOf('.');
      if (indC != -1) {
        let str = curr.substring(indC + 1);
        mul = Math.pow(10, str.length);
        div = Math.pow(mul, 2);

      }
      if (indP != -1) {
        let str = prev.substring(indP + 1);
        mul = Math.pow(10, str.length);
        div = Math.pow(mul, 2);
      }
      equal(mul, div, prev, curr, oper);
      break;
  }
}

function clear() {
  setDefaultSize();
  setPrevNumber('');
  setOperation('');
  setCurrNumber('0');
}

function clickOperation(oper) {
  if (getOperation() != '') {
    equal();
    setPrevNumber(getCurrNumber());
  } else setPrevNumber(getCurrNumber());
  setOperation(oper);
  setCurrNumber(getCurrNumber());
  flag = true;
}

function getPrevNumber() {
  return document.getElementById('prevNum').innerHTML;
}
function setPrevNumber(prev) {
  document.getElementById('prevNum').innerHTML = prev;
}

function getOperation() {
  return document.getElementById('operation').innerHTML;
}
function setOperation(oper) {
  document.getElementById('operation').innerHTML = oper;
}

function getCurrNumber() {
  return document.getElementById('currNum').innerHTML;
}

function setCurrNumber(curr) {
  if (isNaN(+curr) || !isFinite(+curr)) {
    alert('Недопустимый ввод!');
  } else {
    document.getElementById('currNum').innerHTML = curr;
  }
}

function editWidth() {
  let span = document.getElementById('currNum');
  let width = parseInt(getComputedStyle(span).width);
  if (width > 260) {
    let size = parseInt(getComputedStyle(span).fontSize);
    span.style.fontSize = (size / (width / 260)) + 'px';
  }
}