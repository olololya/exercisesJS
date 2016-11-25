'use strict';

export default class DropTarget {

  constructor(elem) {
    elem.dropTarget = this;
    this.elem = elem;
  }

  onDragEnd(avatar, event) {  }

  onDragEnter(avatar, event) {  }

  onDragLeave(avatar, event) {  }
}