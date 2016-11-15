'use strict';

function draw() {
  let canvas = document.getElementById('canv');

  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

  } else {
    throw new Error('Can\'t get context for canvas');
  }
}

