'use strict';

import Figure from './Figure';

export default class Square extends Figure {

  constructor(id, width_canv, height_canv, color = 'blue', radius = 60, type = 'square') {
    super(id, width_canv, height_canv, color, radius, type);
  }

  goX() {
    this.x += this.speed_x;
    if (this.x > this.width_canv - this.radius || this.x < 0) {
      this.speed_x = -this.speed_x;
    }
  }

  goY() {
    this.y += this.speed_y;
    if (this.y > this.height_canv - this.radius ||this. y < 0) {
      this.speed_y = -this.speed_y;
    }
  }

}