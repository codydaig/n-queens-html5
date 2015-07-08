var ChessBoardView = function(matrix) {
  // Store the Matrix
  this.matrix = matrix;

  this.n = matrix.length;

  // Generate the Board
  this.generateBoard();
};

ChessBoardView.prototype.generateBoard = function() {
  // Generate the Board View Here
  
  // Find the 'board' element in the DOM
  $viewBoard = $('.board');

  // store n to a jquery variable as well
  $n = this.n;

  

};