'use strict';

import DropTarget from './DropTarget.js';

export default class FormDropTarget extends DropTarget {

  constructor(elem) {
    super(elem);
  }

  onDragEnd(avatar, event) {
    this.onDragLeave(avatar);
    let newElem = avatar.dragZoneElem.cloneNode(true);
    this.elem.appendChild(newElem);
    avatar.onDragEnd();
  }

  onDragEnter(avatar, event) {
    this.onDragLeave(avatar);
    let div = document.createElement('div');
    div.classList.add('hover');
    div.style.width = '100%';
    div.style.height = parseInt(getComputedStyle(avatar.elem).height) + 'px';

    this.elem.style.heigh = parseInt(getComputedStyle(this.elem).height) + div.style.height;
    this.elem.appendChild(div);
  }

  onDragLeave(avatar, event) {
    let divs = this.elem.getElementsByClassName('hover');
    if (divs.length) divs[0].parentNode.removeChild(divs[0]);
  }
}