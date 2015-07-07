/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
/*
window.findNRooksSolution = function(n) {
  var solution = [];
  for(var r=0; r<n; r++){
    var row = [];
    for(var c=0; c<n; c++){
      if(r === c) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    solution.push(row);
  }

  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
}; */

window.findNRooksSolution = function(n){
  var solution = new Board({n:n});
  for(var i=0; i<n; i++){
    solution.togglePiece(i, i);
  }
  return solution.rows();
}


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1; //fixme

  for(var i=n; i>1; i--){
    solutionCount *= i;
  }

  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  if(n===0 || n === 2 || n === 3){
    return board.rows();
  }

  var returnBoard = [];
  var freeze = false;

  var processRow = function(rowIndex)
  {
    for (var i = 0; i < n; i++)
    {
      board.togglePiece(rowIndex, i);
      //if board is still legal and i = n - 1
      if(!board.hasAnyQueensConflicts()){
        if(rowIndex === (n-1)) {
          //return board
          returnBoard = board.rows();
          freeze = true;
          return board.rows();
        } else {
          processRow(rowIndex + 1);
        }
      }
      if(freeze)
      {
        return;
      }
      board.togglePiece(rowIndex, i);
    }
  }
  processRow(0);

  //console.log('Single solution for ' + n + ' queens:', JSON.stringify(returnBoard));
  return returnBoard;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
 
  var board = new Board({n:n});

  var returnBoard = [];
  var freeze = false;
  //var newN = n;

  if (n === 0) {
    return 1;
  }

  var processRow = function(rowIndex, doubleScore)
  {
    var newN = n;
    if (rowIndex === 0) {
      // On first row, saves time by skipping all squares in second half of row,
      // then doubling score for solutions found. On odd-sized board, skips last
      // half of row (not including middle space), then doubles solution points for
      // all solutions that involve a queen in the first half of the first row, but
      // not those solutions which include a queen in the middle space on the first row.
      newN = Math.ceil(n / 2);
    } else {
      newN = n;
    }
    for (var i = 0; i < newN; i++)
    {

      board.togglePiece(rowIndex, i);
      if(!board.hasAnyQueensConflicts()){
        if(rowIndex === (n-1)) {
          if (doubleScore) {
            solutionCount += 2;
          } else {
          solutionCount++;
          }
        } else {
          processRow(rowIndex + 1, doubleScore || (rowIndex === 0 && i <= (n / 2) - 1));
        }
      }
      
      board.togglePiece(rowIndex, i);
    }
  }
  processRow(0);

  return solutionCount;
};
