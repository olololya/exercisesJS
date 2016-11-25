'use strict';

let dragManager = new function() {

  let dragZone, avatar, dropTarget;
  let downX, downY;

  document.onmousemove = (e) => {
    if (!dragZone) return;

    avatar.onDragMove(e);

    let newDropTarget = findDropTarget(e);

    if (newDropTarget != dropTarget) {
      dropTarget && dropTarget.onDragLeave(avatar, e);
      newDropTarget && newDropTarget.onDragEnter(avatar, e);
    }
    dropTarget = newDropTarget;

    return false;
  };

  document.onmouseup = (e) => {
    if (e.which != 1) {
      return false;
    }

    if (avatar) {
      if (dropTarget) {
        dropTarget.onDragEnd(avatar, e);
      } else {
        avatar.onDragCancel();
      }
    }

    cleanUp();
  };

  document.onmousedown = (e) => {
    if (e.which != 1) {
      return false;
    }

    dragZone = findDragZone(e);

    if (!dragZone) {
      return;
    }

    downX = e.pageX;
    downY = e.pageY;

    if (!avatar) {
      avatar = dragZone.onDragStart(downX, downY, e);

      if (!avatar) {
        cleanUp();
        return;
      }

      avatar.onDragMove(e);
    }

    return false;
  };

  function findDragZone(event) {
    let elem = event.target;
    while (elem != document && !elem.dragZone) {
      elem = elem.parentNode;
    }
    return elem.dragZone;
  }

  function cleanUp() {
    dragZone = avatar = dropTarget = null;
  }

  function findDropTarget(event) {
    let elem = avatar.getTargetElem();

    if (!elem) {
      return null;
    }

    while (elem != document && !elem.dropTarget) {
      elem = elem.parentNode;
    }

    return elem.dropTarget;
  }

  document.ondragstart = function() {
    return false;
  }
};

export { dragManager }