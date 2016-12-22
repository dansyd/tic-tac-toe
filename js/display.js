var currentPlayer = 1;
var turnInterval;

$(document).ready( function() {

  // Check for Win or Draw
  var checkForWinDraw = function() {

    if (game.win || game.draw) {

      clearInterval(turnInterval);

      UIupdateGameEnd();

      setTimeout(function(){
        UIgameReset();
        game.setFirstTurn();
      }, 2000);

    } else {

        game.nextTurn();

        // Play AI move if it's the AI's turn (which it always will be after a human turn, in AI mode)
        if(game.playerTurn === 2 && game.AIActive) {
          AIMoves();
        }

        UIupdateCurrentPlayersTurn();
    }
  }

  /****************
  USER INTERFACE
  ****************/

  // UI - Current Players turn
  var UIupdateCurrentPlayersTurn = function() {
    if (game.playerTurn === 1) {
      $('.player2 .icon').removeClass('turn');
      $('.player1 .icon').toggleClass('turn');
    } else {
      $('.player1 .icon').removeClass('turn');
      $('.player2 .icon').toggleClass('turn');
    }
  }

  // UI - Game end
  var UIupdateGameEnd = function() {
    if (game.win) {
      switch (game.winner.method) {
        case "row":
          $('#' + game.winner.cell + " div").addClass('winner');
          break;
        case "col":
          $('.board .' + game.winner.cell).addClass('winner');
          break;
        case "diagonal":
          if (game.winner.cell === "TL") {
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
      if (game.playerTurn === 1) {
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
    $('.playersInfo .icon').removeClass('turn');

  }

  // UI - Game reset
  var UIgameReset = function() {
    $('.board .row i').fadeOut(500, function(){
      $(this).remove();
      $('.board .row div').removeClass('winner');
    });
    game.reset();
    turnInterval = setInterval(UIupdateCurrentPlayersTurn, 500);
  }

  var AIMoves = function() {
    var AIMove = game.calculateAIMove();
    $('#row' + AIMove[0] + ' .col' + AIMove[1]).html('<i class="' + game.player2 +'">');
    checkForWinDraw();
  }

  /**************
  INIT
  **************/

  // INIT - Symbol click
  $('.symbols li').on('click', function() {
    $('.symbols li').removeClass('selected');
    $(this).addClass('selected');
    $('#initNext').prop('disabled', false);
  });

  // INIT - Radio button change (human or computer)
  $('input[type=radio][name=opponent]').change(function() {
    if (this.value == 'human') {
      $('#playerNo').fadeOut(function() {
        $('#playerNo').text("Player 2").fadeIn(200);
      });
    } else {
      $('#playerNo').fadeOut(function() {
        $('#playerNo').text("Computer").fadeIn(200);
      });
    }
  });

  // INIT - Next button click
  $('#initNext').on('click', function() {

    // Set player's symbol in data
    game.setPlayerSymbol(currentPlayer, $('.symbols li.selected i').attr('class'));

    // set player's symbol in Info panel UI
    if (currentPlayer === 1) {

        $('.player1 .icon i').addClass(game.player1);
        currentPlayer++;
        $('#playerNo').fadeOut(function() {
          $('#playerNo').text("Player " + currentPlayer).fadeIn(200);
        });
        $('.symbols li.selected').fadeOut(500);
        $('#initNext').prop('disabled', true);
        $('.init .opponent').fadeIn(1000, function() {
          $(this).show;
        });

    } else if (currentPlayer === 2) {

      $('.player2 .icon i').addClass(game.player2);

      if ($('.opponent input[value="machine"]').is(':checked')) {
        $('#opponentName').text('Computer');
        game.activateAI();
      }

      game.setFirstTurn();

      // Play AI move if AI has first move
      if(game.playerTurn === 2 && game.AIActive){
        AIMoves();
      }

      turnInterval = setInterval(UIupdateCurrentPlayersTurn, 500);
      $('.init').fadeOut(1000);

    }

  });

  /**********************************
  GAME - Click on a cell on the board
  **********************************/

  $('.board .row div').on('click', function () {

    var cellContent = $(this).children().length;
    // cell is already occupied
    if (cellContent !== 0) {
      return;
    }

    var row = $(this).parent().attr('id');
    var col = $(this).attr('class');
    var cellClass = game.setCell(row, col);
    $(this).html('<i class="' + cellClass +'">');

    checkForWinDraw();

  });

});
