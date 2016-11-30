'use strict';

import Element from './Element'

export default class Text extends Element {

  constructor(elem) {
    super(elem);
    this.placeholder = elem.placeholder || '';
    this.className = 'form-control';
  }

}