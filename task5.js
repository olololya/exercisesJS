/*
 Функция partial(fn, a1, a2, ....), которая позволяет
 зафиксировать один или несколько аргументов функции.
 */

var add5 = partial(add, 5);
var mult23 = partial(mult, 2, 3);

console.log(add5(2)); // 7
console.log(add5(10)); // 15
console.log(add5(8)); // 13
console.log();
console.log(mult23(4, 5)); // 2*3*4*5 = 120
console.log(mult23(1, 1)); // 2*3*1*1 = 6

function partial(func, arg1, arg2) {
  return function() {
    if (!arguments) return;
    switch(arguments.length) {
      case 1:
        return func(arguments[0], 5);
        break;
      case 2:
        return func(arg1, arg2, arguments[0], arguments[1]);
        break;
    };
  };
};

function add(a, b) {
  return a + b;
}
function mult(a, b, c, d) {
  return a * b * c * d;
}