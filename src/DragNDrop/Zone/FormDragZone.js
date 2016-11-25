'use strict';

import DragZone from './DragZone.js';
import FromDragAvatar from '../Avatar/FormDragAvatar.js';

export default class StoreDragZone extends DragZone{

  constructor(elem) {
    super(elem);
  }

  makeAvatar() {
    return new FromDragAvatar(this, this.elem);
  }

}

