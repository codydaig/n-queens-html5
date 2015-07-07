self.addEventListener('message', function(e){
    var data = e.data;

    importScripts('lib/underscore.js', 'lib/backbone.js', 'Board.js', 'BoardView.js');
    //var test = new Board({n:5});
    
    
    //var generateNQueensSolutions = function(n) {
    var solutionCount = 0;
   
    var board = new Board({n:data});
    
    var n = data;

    var returnBoard = [];
    var freeze = false;
    //var newN = n;

    if (n === 0) {
      return 1;
    }
    
    var processRow = function(rowIndex, doubleScore) {
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
      for (var i = 0; i < newN; i++) {

        board.togglePiece(rowIndex, i);
        if(!board.hasAnyQueensConflicts()){
          if(rowIndex === (n-1)) {
            if (doubleScore) {
              solutionCount += 2;
            } else {
            solutionCount++;
            }
            self.postMessage({msg: 'found', payload: board.rows()});
          } else {
            processRow(rowIndex + 1, doubleScore || (rowIndex === 0 && i <= (n / 2) - 1));
          }
        }
        
        board.togglePiece(rowIndex, i);
      }
    };
    processRow(0);

    //return solutionCount;
  //};
  
  self.postMessage({msg: 'done', payload: solutionCount});
  //self.postMessage(board.rows());
});


