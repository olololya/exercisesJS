'use strict';

import Command from './Command.js';

export default class OpenCommand extends Command {

  constructor(model, x, y) {
    super(model);
    this.x = x;
    this.y = y;
    this.openCellsEvents = [];
  }

  execute() {
    this.model.addEventListener('cellChange', (event) => {
      if (event.action === 'open') this.openCellsEvents.push(event);
    });
    this.model.openCell(this.x, this.y);
  }

  cancel() {
    for (let i = 0; i < this.openCellsEvents.length; i++)
      this.model.closeCell(this.openCellsEvents[i].x, this.openCellsEvents[i].y);
  }
}