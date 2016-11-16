
function Figure(id, width_canv, height_canv, color, radius, type) {

  this.id = id;
  this.color = color || 'blue';
  this.radius = radius || 30;
  this.width_canv = width_canv;
  this.height_canv = height_canv;
  this.type = type || 'circle';


  var max = 1, min = -1;
  this.speed_x = Math.floor(Math.random() * (max - min + 1) + min) || max;
  this.speed_y = Math.floor(Math.random() * (max - min + 1) + min) || min;

  this.x = Math.floor(Math.random() * ((this.width_canv- this.radius) - this.radius) + this.radius);
  this.y = Math.floor(Math.random() * ((this.height_canv - this.radius) - this.radius) + this.radius);
}

Figure.prototype.goX = function() {
  this.x += this.speed_x;
  if (this.x > this.width_canv - this.radius || this.x < this.radius) {
    this.speed_x = -this.speed_x;
  }
};

Figure.prototype.goY = function() {
  this.y += this.speed_y;
  if (this.y > this.height_canv - this.radius ||this. y < this.radius) {
    this.speed_y = -this.speed_y;
  }
};

module.exports = Figure;