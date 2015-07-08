var ChessBoard = function(n) {
  // The Matrix will Store an Array of Arrays representing the Rows and Columns
  this.matrix = [];

  // Store n globally so we can access it everywhere
  this.n = n;

  // generate the Initial Matrix
  this.generateMatrix(this.n);
};

ChessBoard.prototype.generateMatrix = function(n) {
  // if n is passed in, let's make sure it's updated
  if(n !== undefined) {
    this.n = n;
  }
  
  // Reset the Matrix back to Nothing
  this.matrix = [];

  // generate n number of rows
  for(var r=0; r<this.n; r++) {
    // Be sure to create the empty array to store the columns in
    this.matrix[r] = [];
    // generate n number of columns in each row
    for(var c=0; c<this.n; c++){
      // Set the Value in the r,c position to 0
      this.matrix[r][c] = 0;
    }
  }

  // Return the new Matrix, just in case someone wants it somewhere for something
  return this.matrix;
};

ChessBoard.prototype.row = function(r) {
  return this.matrix[r];
};

ChessBoard.prototype.rows = function() {
  return this.matrix;
};

ChessBoard.prototype.column = function(c){
  // create a new array to represent the column
  var col = [];

  // for each row
  for(var r=0; r<this.n; r++) {
    // grab the column value and push to the col array
    col.push(this.row(r)[c]);
  }
  // Return the newly generated column array
  return col;
}

ChessBoard.prototype.columns = function() {
  // create a new array to represent the column
  var columnMatrix= [];

  // for each column
  for(var c=0; c<this.n; c++) {
    // get the column and push it to the columMatrix
    columnMatrix.push(this.column(c));
  }

  // Return the Column Matrix
  return columnMatrix;
};
