'use strict';

export default class DragAvatar {

  constructor(dragZone, dragElem) {
    this.dragZone = dragZone;
    this.dragZoneElem = dragElem;
    this.elem = dragElem.cloneNode(true);
  }

  initFromEvent(downX, downY, event) {
    return {
      elem: this.elem,
      dragZoneElem: this.dragZoneElem,
      dragZone: this.dragZone
    }
  }

  getTargetElem() {
    return this.currentTargetElem;
  }

  onDragMove(e) {
    this.elem.style.left = e.pageX - this.shiftX + 'px';
    this.elem.style.top = e.pageY - this.shiftY + 'px';

    this.currentTargetElem = getElementUnderClientXY(this.elem, event.clientX, event.clientY);
  }

  onDragCancel() {}
  onDragEnd() {}

}

function getElementUnderClientXY(elem, x, y) {
  elem.hidden = true;
  let currTarget = document.elementFromPoint(x, y);
  elem.hidden = false;
  if (currTarget == null) {
    return null;
  }

  return currTarget;
}