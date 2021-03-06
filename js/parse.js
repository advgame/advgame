(function(context) {
  var undefined; // Ensure value of undefined is correct
  
  var evalInContext = function(js, ctx) {
    // Return the results of the in-line anonymous function we .call with the passed context
    // From: http://stackoverflow.com/questions/8403108/calling-eval-in-particular-context
    ctx._eval = context.eval;
    ctx._js = js;
    return function() {
      with(this) {
        return this._eval('_eval=undefined;_js=undefined;' + this._js);
      }
    }.call(ctx);
  };
  
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
        
        var gotCmd = ' console.log(window); println("NYI"); '
        
        // TODO: This eval is insecure. Consider:
        //   https://developers.google.com/caja/docs/runningjavascript/
        //   https://github.com/jterrace/js.js/
        evalInContext(gotCmd, runTime);
        
        return doCmd.out;
      };
      
      var runTime = {};
      
      // setToUndef sets variables by key in its context to undefined
      var setToUndef = function(key) {
        if (key instanceof context.Array) {
          for (var i = 0; i < key.length; i++) {
            this[key[i]] = undefined;
          }
        }
        else {
          this[key] = undefined;
        }
      };
      setToUndef.call(runTime, Object.getOwnPropertyNames(context));
      setToUndef.call(runTime, ['context', 'setToUndef', 'js', 'ctx', 'undefined', 'window', 'eval', 'evalInContext']);
      runTime.print = function(output) {
        doCmd.out += output;
      };
      runTime.println = function(output) {
        runTime.print(output + '\n');
      };
      runTime.data = game;
      
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
