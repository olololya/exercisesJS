//Write a JavaScript program which accept a number as input and insert dashes (-)
// between each two even numbers. For example if you accept 025468
// the output should be 0-254-6-8.

function editNumber(num) {
  if (num == '0') return 'error';
  var arr_num = num.split('');
  var new_arr = [];
  for (var i = 0; i < arr_num.length; i++) {
    if (arr_num[i] == '-') return 'error';
  };
  for (i = 0; i < arr_num.length; i++) {
    new_arr.push(arr_num[i]);
    if (arr_num[i] % 2 == 0 && arr_num[i+1] % 2 == 0) {
      new_arr.push("-");
    }
  };
  return new_arr.join('');
};

console.log( editNumber('025468') );
console.log( editNumber('025476823') );
console.log( editNumber('025-468') );
console.log( editNumber('0') );