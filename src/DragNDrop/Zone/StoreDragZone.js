'use strict';

import DragZone from './DragZone.js';
import StoreDragAvatar from '../Avatar/StoreDragAvatar.js';

export default class StoreDragZone extends DragZone{

  constructor(elem) {
    super(elem);
  }

  makeAvatar() {
    return new StoreDragAvatar(this, this.elem);
  }

}

