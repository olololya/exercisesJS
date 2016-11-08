/* Функция take(gen, x) которая вызвает функцию gen заданное число ( x )
 раз и возвращает массив с результатами вызовов.
 */
'use strict';

let gen = sequence(0, 2);
console.log( take(gen, 5) );

function take(func, num) {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push( func() );
  };

  return arr;
};

function sequence(start = 0, step = 1) {
  if (isNaN(parseInt(start))) start = 0;
  if (isNaN(parseInt(step))) step = 0;

  let first_flag = true;

  return function() {
    if (first_flag) {
      first_flag = false;
      return start;
    } else {
      return start += step;
    };
  };
};

