'use strict';

import DragAvatar from './DragAvatar.js';
import JSONParser from '../../JSONParse/JSONController';

export default class FromDragAvatar extends DragAvatar {

  constructor(dragZone, dragElem) {
    super(dragZone, dragElem);
  }

  initFromEvent(downX, downY, event) {
    if (!event.target.classList.contains('draggable')) {
      if (!event.target.parentNode.classList.contains('draggable'))
        return false;
      else this.dragZoneElem = event.target.parentNode;
    } else {
      this.dragZoneElem = event.target;
    }
    let elem = this.elem = this.dragZoneElem.cloneNode(true);
    elem.style.width =  parseInt(getComputedStyle( this.dragZoneElem).width) + 'px';
    elem.style.height =  parseInt(getComputedStyle( this.dragZoneElem).height) + 'px';
    elem.classList.add('avatar');

    let coords = getCoords(this.dragZoneElem);
    this.shiftX = coords.left;
    this.shiftY = coords.top;

    document.body.appendChild(elem);
    elem.style.zIndex = 9999;
    elem.style.position = 'absolute';

    return true;
  }

  destroy() {
    document.body.removeChild(this.elem);
  }

  onDragCancel() {
    this.destroy();
  }

  onDragEnd() {
    this.destroy();
    JSONParser.deleteObj(this.dragZoneElem);
    this.dragZoneElem.parentNode.removeChild(this.dragZoneElem);
  }

}

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: parseInt(getComputedStyle(elem).height) / 2,
    left: parseInt(getComputedStyle(elem).width) / 2
  }
}
