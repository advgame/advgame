(function(context) {
  
  context.loadGame = function(game, callback) {
    game += ''; // Convert game to a string
    // TODO: check if element is HTMLElement
    // see: http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
    
    var request = new context.XMLHttpRequest();
    request.open('GET', 'games/' + context.encodeURIComponent(game) + '.json');
    request.onload = function() {
      // TODO: check for errors with request
      var parsed = context.JSON.parse(request.responseText);
      callback({
        input: function(input) {
          console.log('IN: ' + input);
          return 'NYI';
        },
        getReset: function(cb) {
          return context.loadGame(game, cb);
        },
        getSave: function() {
          // TODO: implement
        }
      });
    };
    request.onerror = function() {
      
    };
    request.send();
  };
})(window);
