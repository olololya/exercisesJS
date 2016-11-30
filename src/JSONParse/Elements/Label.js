'use strict';


export default class Label {

  constructor(elem) {
    this.tagName = 'label';
    this.for = elem.getAttribute('for') || null;
    this.innerHTML = elem.innerHTML || 'Label';
  }

}