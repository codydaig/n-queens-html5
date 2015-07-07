self.addEventListener('message', function(e){
    var n = e.data;
    importScripts('lib/underscore.js', 'lib/backbone.js', 'Board.js', 'BoardView.js');
      
    var board = new Board({n:n});
    if (n === 0) {
      return 1;
    }
    
    var processRow = function(rowIndex) {

      for (var i = 0; i < n; i++) {

        board.togglePiece(rowIndex, i);
        if(!board.hasAnyQueensConflicts()){
          if(rowIndex === (n-1)) {
            self.postMessage({msg: 'found', payload: board.rows()});
          } else {
            processRow(rowIndex + 1);
          }
        }
        board.togglePiece(rowIndex, i);
      }
    };
    processRow(0);

  
  self.postMessage({msg: 'done'});
});


