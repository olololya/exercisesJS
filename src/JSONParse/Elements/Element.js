
'use strict';

export default class Element {

  constructor(elem) {
    this.id = elem.getAttribute('id') || 'id';
    this.tagName = elem.tagName;
  }
}
