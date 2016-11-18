'use strcit';

import GameEvent from './GameEvent.js';

export default class StatusChangeEvent extends GameEvent {

  constructor(status) {
    super('statusChange');
    this.status = status;
  }

}