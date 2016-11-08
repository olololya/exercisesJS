/* Функцию fmap(a, gen), которая принимает на вход 2 функции,
 a и gen, где gen — функция-генератор вроде той, что была в первом задании.
 fmap возвращает новую функцию-генератор, которая при каждом вызове берет
 следующее значение из gen и пропускает его через функцию a.
 */

var gen = sequence(1, 1);

var squareGen = fmap(square, gen);

console.log(squareGen()); // 1
console.log(squareGen()); // 4
console.log(squareGen()); // 9
console.log(squareGen()); // 16


function fmap(func1, func2) {
  return function() {
    return func1( func2() );
  };
};

function square (x) {
  return x * x;
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

