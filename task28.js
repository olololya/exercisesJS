/* Write a JavaScript function to find the longest common starting substring
 in a set of strings.
 Sample array : console.log(longest_common_starting_substring(['go', 'google']));
 Expected result : "go" */

function findSub(arr) {
  if (!Array.isArray(arr)) return 'error (not array)';
  if (arr.length < 2) return 'error (null)';
  for (var value of arr) {
    if (!value) return 'error (null element)';
  }

  arr.sort();
  var str1 = arr[0];
  var str2 = arr[arr.length - 1];

  if (str2.indexOf(str1) !== -1) return str1;

  var count = 0;
  for (var i = 0; i < str1.length; i++) {
    if (str1.charAt(i) === str2.charAt(i)) count++;
  }

  if (count)  return str1.substring(0, count);
  else return 'not found';
}

console.log( findSub(['go', 'google']) );
console.log( findSub(['gol', 'google']) );
console.log( findSub(['googe', 'g']) );
console.log( findSub(['googe', '']) );
console.log( findSub(['sss', 'vvv']) );