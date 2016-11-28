'use strict';

import FormDragAvatar from './Avatar/FormDragAvatar';
import StoreDragAvatar from './Avatar/StoreDragAvatar';

let dragManager = new function() {

  let dragZone, avatar, dropTarget;
  let downX, downY;

  document.onmousemove = (e) => {
    if (!dragZone) return;

    if (!avatar) {
      if (Math.abs(e.pageX - downX) < 1 && Math.abs(e.pageY - downY) < 1) {
        return;
      }
      avatar = dragZone.onDragStart(downX, downY, e);
      if (!avatar) {
        cleanUp();
        return;
      }
    }

    avatar.onDragMove(e);

    let newDropTarget = findDropTarget(e);

    if (newDropTarget != dropTarget) {
      if (avatar instanceof StoreDragAvatar) {
        dropTarget && dropTarget.onDragLeave(avatar, e);
        newDropTarget && newDropTarget.onDragEnter(avatar, e);
      }
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
        if (avatar instanceof FormDragAvatar) avatar.onDragEnd();
        else avatar.onDragCancel();
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