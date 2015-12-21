(function(context) {
  
  context.loadGame = function(game, callback) {
    game += ''; // Convert game to a string
    // TODO: check if element is HTMLElement
    // see: http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
    
    var request = new context.XMLHttpRequest();
    request.open('GET', 'games/' + context.encodeURIComponent(game) + '.json');
    // TODO
    
    return {
      input: function(in) {
        var out;
        // TODO
        return out;
      },
      reset: function() {
        // TODO
      },
      getSave: function() {
        // TODO
      }
    };
  };
})(window);
