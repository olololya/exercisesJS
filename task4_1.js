/* В качестве gen можно было указать функцию с аргументами, и при вызове
 мы получаем новую функцию, которая вызвает add, и результат пропускает
 через функцию square
 var squareAdd = fmap(square, add);
 console.log(squareAdd(2, 3)); // 25 = (2 + 3) ^ 2
 console.log(squareAdd(5, 7)); // 144 = (5 + 7) ^ 2
 */

var gen = sequence(1, 1);

var squareGen = fmap(square, gen);
var squareAdd = fmap(square, add);

console.log('gen', squareGen()); // 1
console.log('gen', squareGen()); // 4
console.log();
console.log('add', squareAdd(2, 3)); // 25 = (2 + 3) ^ 2
console.log('add', squareAdd(5, 7)); // 144 = (5 + 7) ^ 2


function fmap(func1, func2) {
  return function() {
    if (arguments && arguments.length === 2) {
      return func1( func2(arguments[0], arguments[1]) );
    }
    else return func1( func2() );
  };
};

function add(a, b) {
  return a + b;
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

