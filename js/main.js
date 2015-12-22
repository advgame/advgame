$(document).ready(function() {
  window.loadGame('plot', function(game) {
    $('#input>input').keyup(function(e) {
      if (e.which === 13) {
        var input = this.value;
        this.value = '';
        $('#output').append('<span class="oldInput">&amp;gt; ' + input +
          '</span><span class="response">' + game.input(input) + '</span>');
        // TODO: game.input is a trusted function for this to work (no bad HTML)
      }
    });
  });
  
});
