'use strict';

import Element from './Element'

export default class Select extends Element {

  constructor(elem) {
    super(elem);
    this.className = 'form-control';
    this.options = (function () {
      let arr = [];
      for (let child of elem.children) {
        arr.push(child.innerHTML);
      }
      return arr;
    })();
  }

}