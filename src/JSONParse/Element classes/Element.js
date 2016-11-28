'use strict';

export default class Element {

  constructor(elem) {
    this.tagName = elem.tagName;
    this.type = elem.getAttribute('type');
    this.id = elem.getAttribute('id') || null;
    this.class = elem.classList.toString() || null;
    this.name = elem.getAttribute('name');
    this.value = elem.getAttribute('value');
  }

  static createLabel(elem) {
    let new_elem = new Element(elem);
    new_elem.for = elem.getAttribute('for');
    new_elem.innerHTML = elem.innerHTML || null;
    return new_elem;
  }

  static createSelect(elem) {
    let new_elem = new Element(elem);
    new_elem.options = (function() {
      let arr = [];
      for (let child of elem.children) {
        arr.push({
          text: child.innerHTML,
          value: child.value
        });
      }
      return arr;
    })();
    return new_elem;
  }

  static createTextArea(elem) {
    let new_elem = new Element(elem);
    new_elem.row = elem.row;
    new_elem.innerHTML = elem.innerHTML || null;
    return new_elem;
  }

  static createBr(elem) {
    return {
      tagName: elem.tagName
    }
  }

  static getElem(elem) {
    let new_elem = document.createElement(elem.tagName);
    for (let key in elem) {
      if (elem[key] != null && key != 'tagName') {
        if (key == 'innerHTML' ) new_elem.innerHTML = elem[key];
        else new_elem.setAttribute(key, elem[key]);
        if (key == 'options') getChilds(new_elem, elem[key]);
      }
    }
    return new_elem;
  }
}

function getChilds(elem, arr) {
  for (let elem_arr of arr) {
    let option = document.createElement('option');
    option.innerHTML = elem_arr.text;
    option.value = elem_arr.value;
    elem.appendChild(option);
  }
}



