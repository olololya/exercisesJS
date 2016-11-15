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

  var x = 50;
  var speed = 1;

  function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(x, 70, 50, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();

    x += speed;
    if (x > canvas.width - 50) {
      speed = -speed;
    }
    if (x < 50) {
      speed = -speed;
    }
    setTimeout(animation, 7);
  }

  animation();
}

