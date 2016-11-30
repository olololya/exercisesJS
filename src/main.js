'use strict';

import '../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './stylesheets/main.scss';

import './DragNDrop/dragManager.js';
import StoreDragZone from './DragNDrop/Zone/StoreDragZone.js';
import FormDragZone from './DragNDrop/Zone/FormDragZone.js';
import FormDropTarget from './DragNDrop/Target/FormDropTarget';
import JSONParser from './JSONParse/JSONController';

let store = document.getElementById('store');
let form = document.getElementById('my-form');

new StoreDragZone(store);
new FormDragZone(form);
new FormDropTarget(form);


//Button "Get Form"
document.getElementById('fromjson').onclick = () => {
  let form = document.getElementById('your-form');

  let childs = Array.prototype.slice.call(form.children);
  let i = 0;
  for (let child of childs) {
    if (i === 0) {
      i++;
      continue;
    }
    form.removeChild(child);
  }

  JSONParser.fromJSON(form);
};

//Click for modal window
document.onclick = () => {
  if (document.getElementById('modal')) return;
  let elem = event.target;
  while (elem.tagName != 'DIV' && elem != document)
    elem = elem.parentNode;
  if (elem.tagName == 'DIV' && !elem.classList.contains('draggable')) elem = elem.parentNode;
  if (elem === document) return;
  if (elem.parentNode.tagName != 'FORM') return;

  let modalBody = document.getElementById('modal-body');
  for (let i = 0; i < modalBody.childNodes.length; i++) {
    modalBody.removeChild(modalBody.childNodes[i]);
  }

  let component = JSONParser.findObj(elem.id);
  let div = getElementsForModal(component);
  modalBody.appendChild(div);
  $('#myModal').modal();
};

function getElementsForModal(component) {
  let div = document.createElement('div');
  let divID = document.createElement('input');
  divID.id = 'divID';
  divID.type = 'hidden';
  divID.value = component.id;
  div.appendChild(divID);

  for (let key in component) {
    switch (key) {
      case 'id':
        break;
      case 'options':
        div.appendChild(createTextArea('Options', component.options, 'options'));
        break;
      case 'id_elem':
        if (component.component == 'checkable') div.appendChild(createInput('Group name', component.id_elem, 'idEleme'));
        else div.appendChild(createInput('Id Element', component.id_elem, 'id_elem'));
        break;
      case 'placeholder':
        div.appendChild(createInput('Placeholder', component.placeholder, 'placeholder'));
        break;
      case 'rows':
        div.appendChild(createInput('Num rows', component.rows, 'rows'));
        break;
      case 'text':
        div.appendChild(createInput('Button text', component.text, 'text'));
        break;
      case 'label':
        div.appendChild(createInput('Label text', component.label, 'label'));
        break;
    }
  }
  return div;

  function createInput(label, text, id) {
    let div = document.createElement('div');
    div.className = 'modal-div';

    let labelDiv = document.createElement('label');
    labelDiv.innerHTML = label;
    div.appendChild(labelDiv);

    let input = document.createElement('input');
    input.id = id;
    input.type = 'text';
    input.classList.add('form-control');
    input.value = text;
    div.appendChild(input);

    return div;
  }

  function createTextArea(label, arr, id) {
    let div = document.createElement('div');
    div.className = 'modal-div';

    let labelDiv = document.createElement('label');
    labelDiv.innerHTML = label;
    div.appendChild(labelDiv);

    let textarea = document.createElement('textarea');
    textarea.id = id;
    textarea.rows = 4;
    textarea.classList.add('form-control');
    for (let i = 0; i < arr.length; i++) {
      if (i + 1 == arr.length) textarea.value += arr[i];
      else textarea.value += arr[i] + '\n';
    }

    div.appendChild(textarea);

    return div;
  }
};

let buttonSave = document.getElementById('button-save');
buttonSave.onclick = () => {
  let divID = document.getElementById('divID');
  let id = parseInt(divID.value);
  let obj = JSONParser.findObj(id);

  let modal = document.getElementById('modal-body');
  let childsInput = modal.getElementsByTagName('input');
  let childsTextArea = modal.getElementsByTagName('textarea');
  for (let child of childsInput) {
    if (child.value == '') {
      alert('Error! Empty field!');
      return;
    }
    if (child.id == 'divID') continue;
    obj[child.id] = child.value;
  }

  for (let child of childsTextArea) {
    obj[child.id] = child.value;
  }

  let elem = document.getElementById(obj.id);
  let childs = elem.children;
  for (let child of childs) {
    if (child.tagName == 'LABEL') {
      child.innerHTML = obj.label;
      child.setAttribute('for', obj.id_elem);
    } else {
      child.id = obj.id_elem;
      if (obj.placeholder) child.placeholder = obj.placeholder;
      if (obj.rows) {
        if (isNaN(parseInt(obj.rows))) {
          alert('Error! Num rows is not number!');
          return;
        }
        child.setAttribute('rows', obj.rows);
      }
      if (obj.text) child.innerHTML = obj.text;
      if (obj.component == 'checkbox' || obj.component == 'radio') {
        if (!obj.options) {
          alert('Error! Empty field');
          return;
        }
        obj.options = obj.options.split('\n');
        for (let i = 0; i < obj.options.length; i++) {
          if (obj.options[i] == '') {
            obj.options.splice(i, 1);
            i--;
          }
        }
        if (child.tagName == 'SELECT') createOptions(child, obj.options);
        else {
          createCheckable(child, obj.options);
        }
      }
    }
  }

  JSONParser.editObject(obj);

  $('#myModal').modal('hide');

  function createOptions(elem, arr) {
    let childs = elem.getElementsByTagName('option');
    for (let child of childs)
      elem.removeChild(child);

    for (let value of arr) {
      let option = document.createElement('option');
      option.innerHTML = value;
      elem.appendChild(option);
    }
  }

  function createCheckable(elem, arr) {
    let childs = elem.children;
    let type = '';
    let num = childs.length;
    for (let i = 0; i < num; i++) {
      if (childs[0].tagName == 'INPUT') type = childs[0].type;
      elem.removeChild(childs[0]);
    }

    for (let value of arr) {
      if (value == '') continue;
      let input = document.createElement('input');
      input.type = type;
      elem.appendChild(input);
      let label = document.createElement('label');
      label.className = 'check';
      label.innerHTML = value;
      elem.appendChild(label);
    }
  }
};


let buttonDelete = document.getElementById('button-delete');
buttonDelete.onclick = () => {
  let divID = document.getElementById('divID');
  let id = parseInt(divID.value);
  let elem = document.getElementById(id);
  JSONParser.deleteObj(elem);

  elem.parentNode.removeChild(elem);

  $('#myModal').modal('hide');
};