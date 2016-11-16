
var Figure = require('./Figure');

function Circle(id, width_canv, height_canv, color, radius, type){
  Figure.apply(this, arguments);
  this.type = 'circle';
}

Circle.prototype = Object.create(Figure.prototype);
Circle.prototype.constructor = Circle;


module.exports = Circle;