$(document).ready(function() {
  var game = window.loadGame('plot');
  $('#input').keyup(function(e) {
    if (e.which === 13) {
      var input = this.value;
      this.value = '';
      $('#output').val($('#output').val() + game.input(input));
    }
  })
});
