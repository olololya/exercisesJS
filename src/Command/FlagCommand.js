'use strict';

import Command from './Command.js';

export default class FlagCommand extends Command {

  constructor(model, x, y, action) {
    super(model);
    this.x = x;
    this.y = y;
    this.action = action;
  }

  execute() {
    switch (this.action) {
      case 'set':
        this.model.setFlag(this.x, this.y);
        break;
      case 'del':
        this.model.delFlag(this.x, this.y);
        break;
    }
  }

  cancel() {
    switch (this.action) {
      case 'set':
        if (this.model.isFlag(this.x, this.y))
          this.model.delFlag(this.x, this.y);
        break;
      case 'del':
        if (!this.model.isFlag(this.x, this.y))
          this.model.setFlag(this.x, this.y);
        break;
    }
  }
}