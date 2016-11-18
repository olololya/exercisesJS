'use strcit';

import GameEvent from './GameEvent.js';

export default class CellChangeEvent extends GameEvent {

  constructor(x, y) {
    super('cellChange');
    this.x = x;
    this.y = y;
  }

}