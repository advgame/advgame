$(document).ready(function() {
  window.loadGame('plot', function(game) {
    $('#input').keyup(function(e) {
      if (e.which === 13) {
        var input = this.value;
        this.value = '';
        $('#output').val($('#output').val() + game.input(input));
      }
    });
  });
  
});
