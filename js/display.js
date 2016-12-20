var currentPlayer = 1;
var turnInterval;

$(document).ready( function() {

  // INIT - Change symbol selection
  $('.symbols li').on('click', function() {
    $('.symbols li').removeClass('selected');
    $(this).addClass('selected');
    $('#initNext').prop('disabled', false);
  });

  // INIT - Choose player's symbol on click of 'Next' button
  $('#initNext').on('click', function() {

    var $playerNo = $('#playerNo');
    var $selectedSymbol = $('.symbols li.selected');
    // Set player's symbol in data
    game.setPlayerSymbol(currentPlayer, $('.symbols li.selected i').attr('class'));

    // set player's symbol in Info panel UI
    if( currentPlayer === 1) {

        $('.player1 .icon i').addClass(game.player1);
        currentPlayer++;
        $playerNo.fadeOut(function() {
          $playerNo.text(currentPlayer).fadeIn(200);
        });
        $selectedSymbol.fadeOut(500);
        $('#initNext').prop('disabled', true);


    } else if (currentPlayer === 2) {

      $('.player2 .icon i').addClass(game.player2);
      // decide turn and activate flashing on player's symbol
      game.setFirstTurn();
      turnInterval = setInterval(updateCurrentPlayerUI, 500);
      $('.init').fadeOut(1000);

    }

  });

  // GAME - Next turn
  var updateCurrentPlayerUI = function() {
    if (game.playerTurn === 1) {
      $('.player2 .icon').removeClass('turn');
      $('.player1 .icon').toggleClass('turn');
    } else {
      $('.player1 .icon').removeClass('turn');
      $('.player2 .icon').toggleClass('turn');
    }
  }

  // GAME - Click on a cell on the board
  $('.board .row div').on('click', function () {

    var cellContent = $(this).children().length;
    if (cellContent !== 0) {
      // cell is already occupied
      return;
    }

    var row = $(this).parent().attr('id');
    var col = $(this).attr('class');
    var cellClass = game.setCell(row, col);
    $(this).html('<i class="' + cellClass +'">');

    if (game.winner) {
      clearInterval(turnInterval);
    } else {
      game.nextTurn();
      updateCurrentPlayerUI();
    }



  });


});
