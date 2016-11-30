'use strict';

import Element from './Element'

export default class Button extends Element {

  constructor(elem) {
    super(elem);
    this.className = elem.classList.toString() || 'btn btn-default';
    this.text = elem.innerHTML;
  }
}