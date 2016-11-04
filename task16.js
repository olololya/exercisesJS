//Find the leap years in a given range of years.

function findLeapYears(begin, end) {
  if (begin < 0 || begin === undefined || end === undefined) return 'error';
  var arr = [];

  for (var i = begin; i <= end; i++) {
    if (i % 4 === 0) arr.push(i);
  };

  return arr;
};

console.log( findLeapYears(2000, 2016) );