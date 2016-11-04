//Write a JavaScript program which accept a string as input and swap
// the case of each character. For example if you input 'The Quick Brown Fox'
// the output should be 'tHE qUICK bROWN fOX'.

function swapCase(str) {
  if (str.length === 0) return 'error (null)';
  var arr = str.split('');

  var count = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === ' ') count++;
  };
  if (count === arr.length) return 'error (null)';

  for (i = 0; i < arr.length; i++) {
    if (arr[i] === ' ') continue;
    if (arr[i] < 'a') arr[i] = arr[i].toLowerCase();
    else arr[i] = arr[i].toUpperCase();

  };

  return arr.join('');
};

console.log( swapCase('The Quick Brown Fox') );
console.log( swapCase('     ') );
console.log( swapCase('     xXx') );