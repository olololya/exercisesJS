'use strict';

export default class GameController {

  constructor(model, views) {
    this.model = model;
    this.views = views;

  }

  init() {
    for (let i = 0; i < this.views.length; i++)
      this.views[i].setClickCell((x, y) => {
        if (this.model.getNumClicks() == 0) {
          this.model.generateBomb(x, y);
          this.views[0].showBombs();
        }
        if (!this.model.isOpenCell(x, y)) {
          if (!this.model.isBomb(x, y))
            this.model.openCell(x, y);
          else this.model.endGame();
          for (let view of this.views)
            view.reload();
        }
        this.model.setClick();
      });

    this.model.startGame();
    for (let view of this.views)
      view.reload();
  }

}