var currentPlayer = 1;

$(document).ready( function() {

  // $('.init').hide();

  $('.board .row div').on('click', function () {
    if ($(this).children.length !== 0) {
      var row = $(this).parent().attr('id');
      var col = $(this).attr('class');
      $(this).html('<i class="' + game.setCell(row, col) +'">');
    }
  });

  $('.symbols li').on('click', function() {
    $('.symbols li').removeClass('selected');
    $(this).addClass('selected');
  });

  $('#initNext').on('click', function() {
    var $playerNo = $('#playerNo');
    var $selectedSymbol = $('.symbols li.selected');
    // Set player's symbol in data
    game.setPlayerSymbol(currentPlayer, $('.symbols li.selected i').attr('class'));
    if (currentPlayer === 2) {
      $('.player2 .icon i').addClass(game.player2);
      // decide turn and activate flashing on player's symbol
      game.setTurn();
      var turnInterval = setInterval(function() {
        if (game.playerTurn === 1) {
          $('.player1 .icon').toggleClass('turn');
        } else {
          $('.player2 .icon').toggleClass('turn');
        }
      }, 500);

      $('.init').fadeOut(1000);
      return;
    }
    // set player's symbol in UI
    $('.player1 .icon i').addClass(game.player1);
    currentPlayer++;
    $playerNo.fadeOut(function() {
      $playerNo.text(currentPlayer).fadeIn(200);
    });
    $selectedSymbol.fadeOut(500);
  });

});
