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
      
      var parsed = context.JSON.parse(request.responseText);
      callback({
        input: function(input) {
          console.log('IN: "' + input + '"'); // Log input
          
          input = (input + '').toLowerCase(); // Lowercase the input
          
          var out = 'NYI';
          
          console.log('OUT: "' + out + '"'); // Log output
          return out;
        },
        getReset: function(cb) {
          return context.loadGame(game, cb);
        },
        getSave: function() {
          // TODO: implement
        }
      });
    };
    var gameError = function() {
      console.error('ERROR: Could not load game. (status: '+ request.status + ')');
      callback({ name: 'Error: Game Could Not Load', isError: true});
    };
    request.onerror = gameError;
    request.send();
  };
})(window);
