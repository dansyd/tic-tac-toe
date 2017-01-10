var currentPlayer = 1;
var turnInterval;

$(document).ready( function() {

  /************
  UI
  ************/
  // UI - Current Players turn
  var UIpdateCurrentPlayersTurn = function() {
    if (game.data.playerTurn === 1) {
      $('.player2 .icon').removeClass('turn');
      $('.player1 .icon').toggleClass('turn');
    } else {
      $('.player1 .icon').removeClass('turn');
      $('.player2 .icon').toggleClass('turn');
    }
  }

  var UIupdateBoard = function() {
    for (var i = 0; i < game.data.board.length; i++) {
      for (var j = 0; j < 3; j++) {
        if (game.data.board[i][j] !=='') {
          $('#row' + i + ' .col' + j).html('<i class="' + game.data.board[i][j] + '"></i>');
        }
      }
    }
  }

  // UI - Game end, highlight the row/column/diagonal and update the score
  var UIupdateGameEnd = function() {
    if (game.data.win) {
      switch (game.data.winner.method) {
        case "row":
          $('#' + game.data.winner.cell + " div").addClass('winner');
          break;
        case "col":
          $('.board .' + game.data.winner.cell).addClass('winner');
          break;
        case "diagonal":
          if (game.data.winner.cell === "TL") {
            $('#row0 .col0').addClass('winner');
            $('#row1 .col1').addClass('winner');
            $('#row2 .col2').addClass('winner');
          } else {
            $('#row2 .col0').addClass('winner');
            $('#row1 .col1').addClass('winner');
            $('#row0 .col2').addClass('winner');
          }
          break;
        default:
          break;
      }
      if (game.data.playerTurn === 1) {
        var player1Score = parseInt($('#player1Score').text());
        player1Score++;
        $('#player1Score').fadeOut(function() {
          $('#player1Score').text(player1Score).fadeIn(2000);
        });
      } else {
        var player2Score = parseInt($('#player2Score').text());
        player2Score++;
        $('#player2Score').fadeOut(function() {
          $('#player2Score').text(player2Score).fadeIn(2000);
        });
      }
    }
    // Stop flashing on current player's turn while displaying
    $('.playersInfo .icon').removeClass('turn');
  }

  // UI - Game reset
  var UIgameReset = function() {
    $('.board .row i').fadeOut(500, function(){
      $(this).remove();
      $('.board .row div').removeClass('winner');
    });
  }

  /************
  INIT
  ************/
  // INIT - Change symbol selection
  $('.symbols li').on('click', function() {
    $('.symbols li').removeClass('selected');
    $(this).addClass('selected');
    $('#initNext').prop('disabled', false);
  });

  // INIT - Set player's symbol on click of 'Next' button
  $('#initNext').on('click', function() {

    var $playerNo = $('#playerNo');
    var $selectedSymbol = $('.symbols li.selected');
    // Set player's symbol class in data
    game.setPlayerSymbol(currentPlayer, $('.symbols li.selected i').attr('class'));

    // set player's symbol in Info panel UI
    if( currentPlayer === 1) {

        $('.player1 .icon i').addClass(game.data.player1);
        currentPlayer++;
        $playerNo.fadeOut(function() {
          $playerNo.text("Player " + currentPlayer).fadeIn(200);
        });
        $selectedSymbol.fadeOut(500);
        $('#initNext').prop('disabled', true);

    } else if (currentPlayer === 2) {

      $('.player2 .icon i').addClass(game.data.player2);

      // decide turn and activate flashing on player's symbol
      game.setFirstTurn();
      turnInterval = setInterval(UIpdateCurrentPlayersTurn, 500);
      $('.init').fadeOut(1000);
      $('.container').fadeIn(1000);
    }

  });

  /************
  GAME
  ************/
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
    UIupdateBoard();

    if (game.data.win || game.data.draw) {
      //disable click on the board while loading new game
      $(".board").css("pointer-events", "none");
      clearInterval(turnInterval);
      UIupdateGameEnd();
      // Reset everything after 2 seconds, so the user can have a feedback on how the game was won/drawn
      setTimeout(function(){
        UIgameReset();
        game.reset();
        turnInterval = setInterval(UIpdateCurrentPlayersTurn, 500);
        //re-calculate random first turn
        game.setFirstTurn();
        //re-enable click on board once reloaded
        $(".board").css("pointer-events", "auto");
      }, 2000);

    } else {
      game.nextTurn();
      UIpdateCurrentPlayersTurn();
    }

  });

  gameRef.on('value',function() {
    UIupdateBoard();
  });
});
