'use strict';

import DragAvatar from './DragAvatar.js';

export default class FromDragAvatar extends DragAvatar {

  constructor(dragZone, dragElem) {
    super(dragZone, dragElem);
  }

  initFromEvent(downX, downY, event) {
    let flag = false;
    if (event.target.tagName != 'DIV' || event.target.id == 'my-form') {
      if (event.target.parentNode.tagName != 'DIV' && !event.target.parentNode.classList.contains('.draggable'))
        return false;
      else {
        this.dragZoneElem = event.target.parentNode;
        flag = true;
      }
    }
    if (!flag) this.dragZoneElem = event.target;
    let elem = this.elem = this.dragZoneElem.cloneNode(true);
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
    this.dragZoneElem.parentNode.removeChild(this.dragZoneElem);
    document.body.removeChild(this.elem);
  }

  onDragCancel() {
    this.destroy();
  }

  onDragEnd() {
    this.destroy();
  }

}

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: parseInt(getComputedStyle(elem).height) / 2,
    left: parseInt(getComputedStyle(elem).width) / 2
  }
}
