'use strict';

import Circle from './Circle';
import Square from './Square';

export default class Board {

  constructor(id, color = 'gray', width = 300, height = 300) {
    this.id = id;
    this.color = color;
    this.width = width;
    this.height = height;
    this.figures = [];
    this.ctx = (function(obj){

      let container = document.getElementById('container');

      let canvas = document.createElement('canvas');
      canvas.setAttribute('id', obj.id);
      canvas.setAttribute('width', obj.width);
      canvas.setAttribute('height', obj.height);
      container.appendChild(canvas);

      return canvas.getContext('2d');
    })(this);
  }

  addFigure(type) {
    switch(type) {
      case 'circle':
        this.figures.push(new Circle(this.figures.length, this.width, this.height));
        break;
      case 'square':
        this.figures.push(new Square(this.figures.length, this.width, this.height));
        break;
    }

    console.log(this.figures);
  }

  drawRect() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawRect();

    for (let figure of this.figures) {
      this.ctx.fillStyle = figure.color;
      switch(figure.type) {
        case 'circle':
          this.ctx.beginPath();
          this.ctx.arc(figure.x, figure.y, figure.radius, 0, Math.PI * 2, true);
          this.ctx.fill();
          this.ctx.stroke();
          break;
        case 'square':
          this.ctx.fillRect(figure.x, figure.y, figure.radius, figure.radius);
          break;
      }

      figure.goX();
      figure.goY();
    }

    let f = this.draw.bind(this);
    setTimeout(f, 7);
  }

}