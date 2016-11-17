'use strict';

export default class GameController {

  constructor(model, views) {
    this.model = model;
    this.views = views;

  }

  init() {
    for (let i = 0; i < this.views.length; i++) {
      //onclick
      this.views[i].setClickCell((x, y) => {
        if (this.model.getNumClicks() == 0) {
          this.model.generateBomb(x, y);
          this.views[0].showBombs();
        }
        if (!this.model.isOpenCell(x, y)) {
          if (this.model.isFlag(x, y))
            this.model.delFlag(x, y);
          if (!this.model.isBomb(x, y))
            this.model.openCell(x, y);
          else this.model.endGame('lose');
          for (let view of this.views)
            view.reload();
        }
        this.model.setClick();
      });
      //oncontextmenu
      this.views[i].setContextmenuClickCell((x, y) => {
        if (this.model.getNumClicks() == 0) return;
        if (this.model.isFlag(x, y)) this.model.delFlag(x, y);
        else {
          if (this.model.getNumFlags() == 0) return;
          else this.model.setFlag(x, y);
        }

        for (let view of this.views)
          view.reload();
      });
    }

    this.model.startGame();
    for (let view of this.views)
      view.reload();
  }

}