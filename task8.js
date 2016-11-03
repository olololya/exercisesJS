//Write a JavaScript program for binary search. 

var arr = [0, 1, 2, 3, 4, 5, 6];

function binarySearch(begin, end, num, arr) {
   var avrg = Math.floor((begin + end)/ 2);
   if (arr[avrg] === num) {
     console.log('ind = ', avrg);
     return;
   };
   if (num < arr[avrg]) binarySearch(begin, avrg - 1, num, arr);
   if (num > arr[avrg]) binarySearch(avrg + 1, end, num, arr);
   return;
};

binarySearch(0, arr.length, 1, arr);