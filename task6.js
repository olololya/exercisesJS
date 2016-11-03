//Write a JavaScript program to get the first n Fibonacci numbers. 

function getFibonacci(n) {
  if (n == 1) {  
    return [0, 1];  
  }   
  else {  
    var arr = getFibonacci(n - 1);
    arr.push(arr[arr.length - 1] + arr[arr.length - 2]);  
    return arr; 
  }
};

console.log( getFibonacci(10) ); // [0,1,1,2,3,5,8,13,21,34];