//Write a JavaScript program to compute the exponent of a number. 

var exp = 0;

function getExponent(num, res) {
    exp++;
    if (num != res) {
      return getExponent(num, res / num);
    } else {
      return exp;
    };
};

console.log ( getExponent(8, 512) ); //3