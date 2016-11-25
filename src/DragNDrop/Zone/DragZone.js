'use strict';

export default class DragZone {

  constructor(elem) {
    elem.dragZone = this;
    this.elem = elem;
  }

  onDragStart(downX, downY, event) {
    let avatar = this.makeAvatar();

    if (!avatar.initFromEvent(downX, downY, event)) {
      return false;
    }

    return avatar;
  }

  makeAvatar() {  }

}