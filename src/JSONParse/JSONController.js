'use strict';

import TextAreaComponent from './Components/TextAreaComponent';
import InputComponent from './Components/InputComponent';
import ButtonComponent from './Components/ButtonComponent';
import SelectComponent from './Components/SelectComponent';
import CheckableComponent from './Components/CheckableComponent';

export default class JSONController {

  constructor() {}

  static addObj(elem) {
    let id = getID();
    let obj = {};

    let type = getTypeElem(elem);
    switch (type) {
      case 'textarea':
        obj = new TextAreaComponent(elem, id);
        break;
      case 'input':
        obj = new InputComponent(elem, id);
        break;
      case 'button':
        obj = new ButtonComponent(elem, id);
        break;
      case 'select':
        obj = new SelectComponent(elem, id);
        break;
      case 'div':
        obj = new CheckableComponent(elem, id);
        break;
    }
    let arr = getJSONArr();
    arr.push(obj);
    setJSONArr(arr);

    return id;
  }

  static deleteObj(elem) {
    let arr = getJSONArr();
    let ind;
    for (ind = 0; ind < arr.length; ind++) {
      if (arr[ind].id == elem.id) break;
    }
    arr.splice(ind, 1);

    setJSONArr(arr);
  }

  static findObj(id) {
    let arr = getJSONArr();
    for (let elem of arr)
      if (elem.id == id) return elem;
  }

  static editObject(obj) {
    let arr = getJSONArr();
    for (let elem of arr) {
      if (elem.id == obj.id) {
        for (let key in obj)
          elem[key] = obj[key];
      }
    }
    setJSONArr(arr);
  }


  static fromJSON(form) {
    let arr = getJSONArr();

    for (let value of arr) {
      let div = document.createElement('div');
      div.className = 'container-elements';
      form.appendChild(div);

      if (value.label) {
        let label = document.createElement('label');
        label.setAttribute('for', value.id_elem);
        label.innerHTML = value.label;
        div.appendChild(label);
      }

      let element = {};
      if (value.component == 'text') {
          element = document.createElement('input');
          element.type = value.component;
      }
      else {
        if (value.component == 'checkbox' ||value.component == 'radio' ) {
          element = document.createElement('div');
          element.className = 'check-container'
        } else
          element = document.createElement(value.component);
      }
      element.id = value.id_elem;

      if (value.className) element.className = value.className;
      if (value.placeholder) element.placeholder = value.placeholder;
      if (value.rows) element.setAttribute('rows', value.rows);
      if (value.text) element.innerHTML = value.text;
      if (value.options) {
        if (value.component == 'select') {
          for (let val of value.options) {
            let option = document.createElement('option');
            option.innerHTML = val;
            element.appendChild(option);
          }
        }
        else {
          for (let val of value.options) {
            if (val == '') continue;
            let input = document.createElement('input');
            input.type = value.component;
            element.appendChild(input);
            let label = document.createElement('label');
            label.className = 'check';
            label.innerHTML = val;
            element.appendChild(label);
          }
        }
      }
      div.appendChild(element);
    }
  }

}

function getID() {
  let text = document.getElementById('textareaJSON').value;
  let id = 0;
  if (text !== '') {
    text = JSON.parse(text);
    id = text.length;
  }
  return id;
}

function getTypeElem(elem) {
  let childs = elem.children;
  let type = '';
    for (let child of childs) {
    if (child.tagName != 'LABEL') {
      type = child.tagName;
    }
  }
  return type.toLowerCase();
}

function getJSONArr() {
  let textArea = document.getElementById('textareaJSON');
  let text = textArea.value;
  if (text == '') return [];
  return JSON.parse(text);
}

function setJSONArr(arr) {
  let textArea = document.getElementById('textareaJSON');
  if (arr.length == 0) textArea.value = '';
  else textArea.value = JSON.stringify(arr);
}
