/*Функция создания генератора sequence(start, step).
 Она при вызове возвращает другую функцию-генератор, которая при каждом вызове
 дает число на 1 больше, и так до бесконечности. Начальное число, с которого
 начинать отсчет, и шаг, задается при создании генератора. Шаг можно не указывать,
 тогда он будет равен одному. Начальное значение по умолчанию равно 0.
 Генераторов можно создать сколько угодно.
*/
'use strict';

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

var generator = sequence(10, 3);
var generator2 = sequence(7, 1);
var generator3 = sequence();

console.log('№1', generator());
console.log('№1', generator());

console.log('№2', generator2());

console.log('№1', generator());

console.log('№2', generator2());

console.log('№3', generator3());
console.log('№3', generator3());