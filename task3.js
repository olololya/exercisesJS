/* Функция map(fn, array), которая принимает на вход функцию и массив,
 и обрабатывает каждый элемент массива этой функцией, возвращая новый
 массив.*/

console.log(map(square, [1, 2, 3, 4])); // [1, 4, 9, 16]
console.log(map(square, [])); // []

function map(func, arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = func(arr[i]);
  };
  return arr;
};

function square (x) {
  return x * x;
};