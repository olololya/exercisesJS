
var Figure = require('./Figure');

function Square(id, width_canv, height_canv, color, radius, type) {

  if (!radius) radius = 60;
  type = 'square';

  Figure.apply(this, arguments);
}

Square.prorotype.goX = function() {
  this.x += this.speed_x;
  if (this.x > this.width_canv - this.radius || this.x < 0) {
    this.speed_x = -this.speed_x;
  }
};

Square.prorotype.goX = function() {
  this.y += this.speed_y;
  if (this.y > this.height_canv - this.radius ||this. y < 0) {
    this.speed_y = -this.speed_y;
  }
};

module.exports = Square;