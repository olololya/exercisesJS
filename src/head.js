/*  Form with configuration */
'use strict';

import './head.css';

function clear() {
  let forms = document.forms;
  if (forms) {
    for (let i = 0; i < forms.length; i++) {
      if (forms[i]) document.body.removeChild(forms[i]);
    }
  }
}

module.exports.init = function(diff) {
  clear();

  //Create HEADER
  let head = document.createElement('header');
  document.body.appendChild(head);

  //Create FORM
  let form = document.createElement('form');
  form.setAttribute('action', '#');

  head.appendChild(form);

  //Create DIV-containers in FORM
  let divs = new Array(2);
  let class_divs = ['input-container', 'button-container'];
  for (let i = 0; i < divs.length; i++) {
    divs[i] = document.createElement('div');
    divs[i].className = class_divs[i];
    form.appendChild(divs[i]);
  }

  //Create P in DIV-1
  let p = document.createElement('p');
  p.innerHTML = 'Choice difficult ';
  divs[0].appendChild(p);

  //Create LABELS and INPUTS in DIV-1
  let labels = new Array(3);
  let radios = new Array(3);
  let label_text = ['easy', 'normal', 'hard'];
  let id_radios = ['diff-easy', 'diff-normal', 'diff-hard'];

  for (let i = 0; i < labels.length; i++) {
    radios[i] = document.createElement('input');
    radios[i].setAttribute('type', 'radio');
    radios[i].setAttribute('id', id_radios[i]);
    radios[i].setAttribute('name', 'difficult');
    if (i === 0) radios[i].setAttribute('checked', 'true');
    divs[0].appendChild(radios[i]);

    labels[i] = document.createElement('label');
    labels[i].setAttribute('for', id_radios[i]);
    labels[i].innerHTML = label_text[i];
    divs[0].appendChild(labels[i]);
  }

  let button = document.createElement('button');
  button.setAttribute('id', 'button-start');
  button.innerHTML = 'Start game';
  divs[1].appendChild(button);

  //document.body.appendChild(form);

  //Create DIV-COLORS
  let div = document.createElement('div');
  div.setAttribute('class', 'colors-container');
  p = document.createElement('p');
  p.innerHTML = 'Colors';
  div.appendChild(p);
  let psText = ['flag', 'bomb', 'flag on bomb (end game)'];
  let ps = new Array(psText.length);
  for (let i = 0; i < ps.length; i++) {
    ps[i] =  document.createElement('p');
    ps[i].innerHTML = psText[i];
    div.appendChild(ps[i]);
  }
  head.appendChild(div);

  //Create DIV-FLAGS
  div = document.createElement('div');
  div.setAttribute('class', 'flags-container');
  p = document.createElement('p');
  p.innerHTML = 'Num flags';
  div.appendChild(p);
  let span = document.createElement('span');
  span.setAttribute('id', 'flags');
  span.innerHTML = diff.bombs;
  div.appendChild(span);
  head.appendChild(div);


  return button;
};