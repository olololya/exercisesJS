'use strict';

import Element from './Element classes/Element';

export default class JSONParser {

  constructor() {}

  static toJSON(parentElem) {
    let jsonArr = [];
    let divs = parentElem.getElementsByClassName('draggable');
    for (let div of divs) {
      let childs = div.children;
      let arr = [];
      for (let child of childs) {
        let elem = {};
        switch (child.tagName) {
          case 'LABEL':
            elem = new Element.createLabel(child);
            break;
          case 'TEXTAREA':
            elem = new Element.createTextArea(child);
            break;
          case 'SELECT':
            elem = new Element.createSelect(child);
            break;
          case 'BR':
            elem = new Element.createBr(child);
            break;
          default:
            elem = new Element(child);
            break;
        }
        arr.push(elem);
      }
      jsonArr.push(arr);
    }
    return JSON.stringify(jsonArr);
  }

  static fromJSON(strJSON, parentElem) {
    try {
      let jsonArr = JSON.parse(strJSON);
      for (let i = 0; i < jsonArr.length; i++) {
        let div = document.createElement('div');
        div.classList.add('container-elements');
        parentElem.appendChild(div);
        for (let elem of jsonArr[i]) {
          let new_elem = Element.getElem(elem);
          div.appendChild(new_elem);
        }
      }
    } catch (e) {
      alert('Error! Something wrong with your json');
      console.log(e);
    }
  }
}