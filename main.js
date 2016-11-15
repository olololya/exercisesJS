'use strict';

function draw() {
  let canvas = document.getElementById('canv');

  let ctx = null;
  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
  } else {
    throw new Error('Can\'t get context for canvas');
  }

  ctx.fillStyle = 'rgb(101, 255, 204)';

  let radius = 50;
  let x = (canvas.width / 2) - (radius / 2);
  let y = (canvas.height / 2) - (radius / 2);

  let max = 1, min = -1;
  let speed_x = Math.floor(Math.random() * (max - min + 1) + min) || max;
  let speed_y = Math.floor(Math.random() * (max - min + 1) + min) || min;

  function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();

    x += speed_x;
    if (x > canvas.width - radius || x < radius) {
      speed_x = -speed_x;
    }

    y += speed_y;
    if (y > canvas.height - radius || y < radius) {
      speed_y = -speed_y;
    }

    setTimeout(animation, 7);
  }

  animation();
}

