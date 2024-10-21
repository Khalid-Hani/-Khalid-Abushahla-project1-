// var searchMatrix = function (matrix, target) {
//   for (let i = 0; i < matrix.length; i++) {
//     for (let j = 0; j < matrix[i].length; j++) {
//       if (target === matrix[i][j]) {
//         return true;
//       }
//     }
//   }
//   return false;
// };

var searchMatrix = function (matrix, target) {
  let i = 0;
  let x = 0;

  for (i = 0; i < matrix.length; i++) {
    if (matrix[i][matrix[0].length - 1] >= target) {
      for (x = 0; x < matrix[i].length; x++) {
        if (target === matrix[i][x]) {
          return true;
        }
      }
    }
  }
  return false;
};

let matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60],
];
let target = 60;
console.log(searchMatrix(matrix, target));
