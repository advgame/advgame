(function(context) {
  
  context.loadGame = function(game, callback) {
    game += ''; // Convert game to a string

    var request = new context.XMLHttpRequest();
    request.open('GET', 'games/' + context.encodeURIComponent(game) + '.json');
    request.onload = function() {
      if ((request.status + '').charAt(0) !== '2') {
        // If status code does not begin with a 2 (success), abort with error
        gameError();
        return;
      }
      
      var gameStr = game;
      var initialGame = context.JSON.parse(request.responseText);
      
      game = initialGame;
      
      // doCmd() accepts an already-filtered string (no punctuation, etc.)
      var doCmd = function(cmd, runTime) {
        doCmd.out = '';
        
        var gotCmd = ' out("NYI"); '
        
        eval.call(runTime, gotCmd);
        
        return doCmd.out;
      };
      
      var runTime = {
        out: function(output) {
          doCmd.out += output;
        },
        run: function(cmd) {
          doCmd(cmd, runTime);
        },
        data: game
      };
      
      callback({
        input: function(input) {
          console.log('IN: "' + input + '"'); // Log input
          
          input = (input + '').toLowerCase().replace(/[^a-z\s0-9]/gi, ' ').replace(/\s+/g, ' ').trim(); 
          // Lowercase the input and remove non-letter/number characters and excess spaces
          
          var out = doCmd(input, runTime);
          
          console.log('OUT: "' + out + '"'); // Log output
          return out;
        },
        getReset: function(cb) {
          // Return a newly loaded game when getReset() is called
          return context.loadGame(gameStr, cb);
        },
        getSave: function() {
          // TODO: implement
        }
      });
    };
    var gameError = function() {
      console.error('ERROR: Could not load game. (status: ' + request.status + ')');
      callback({ name: 'Error: Game Could Not Load', isError: true });
    };
    request.onerror = gameError;
    request.send();
  };
})(window);
