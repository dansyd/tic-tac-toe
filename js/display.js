var playerSelect = 1;

$(document).ready( function() {

  $('.init').hide();

  $('.board.row div').on('click', function () {
    var row = $(this).parent().attr('id');
    var col = $(this).attr('class');
    var cell = game.checkCell(row, col);
    if (!cell) {
      game.setCell(row, col, "X");
      $(this).html("X");
    }
  });

  $('.symbols li').on('click', function() {
    $('.symbols li').removeClass('selected');
    $(this).addClass('selected');
  });

  $('#initNext').on('click', function() {
    var $playerNo = $('#playerNo');
    var $selectedSymbol = $('.symbols li.selected');
    game.setPlayerSymbol(playerSelect, $('.symbols li.selected i').attr('class'));
    if (playerSelect === 2) {
      $('.init').fadeOut(1000);
      return;
    }
    playerSelect++;
    $playerNo.fadeOut(function() {
      $playerNo.text(playerSelect).fadeIn(200);
    });
    $selectedSymbol.fadeOut(500);
  });

});
