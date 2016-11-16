
var Circle = require('./Circle');
var Square = require('./Circle');

function Board(id, color, width, height) {

  this.id = id;
  this.color = color || 'lightgray';
  this.width = width || 300;
  this.height = height || 300;
  this.figures = [];
  this.ctx = (function(obj){

    var container = document.getElementById('container');

    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', obj.id);
    canvas.setAttribute('width', obj.width);
    canvas.setAttribute('height', obj.height);
    container.appendChild(canvas);

    return canvas.getContext('2d');
  })(this);


  this.addFigure = function(type, color, radius) {
    switch(type) {
      case 'circle':
        this.figures.push(new Circle(this.figures.length, this.width, this.height, color, radius));
        break;
      case 'square':
        this.figures.push(new Square(this.figures.length, this.width, this.height, color, radius * 2));
        break;
    }
  };

  this.drawRect = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  };

  this.draw = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawRect();

    for (var figure of this.figures) {
      this.ctx.fillStyle = figure.color;
      this.ctx.beginPath();
      switch(figure.type) {
        case 'circle':
          this.ctx.arc(figure.x, figure.y, figure.radius, 0, Math.PI * 2, true);
          break;
        case 'square':
          this.ctx.fillRect(figure.x, figure.y, figure.radius, figure.radius);
          this.ctx.strokeRect(figure.x, figure.y, figure.radius, figure.radius);
          break;
      }
      this.ctx.fill();
      this.ctx.stroke();
      figure.goX();
      figure.goY();
    }

    var f = this.draw.bind(this);

    setTimeout(f, 7);
  };

}

module.exports = Board;