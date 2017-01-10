var config = {
    apiKey: "AIzaSyASv5mqjGniNdmzc80PMYNxlJI--TWLhJM",
    authDomain: "tic-tac-toe-a7067.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-a7067.firebaseio.com",
    storageBucket: "tic-tac-toe-a7067.appspot.com",
    messagingSenderId: "949178931152"
  };
firebase.initializeApp(config);


// Use the shorthand notation to retrieve the default app's services
var storage = firebase.storage();
var database = firebase.database();
var gameRef = database.ref('game');

var game = {

  data: {board: [['', '', ''],['', '', ''],['', '', '']],

  playerTurn: 0,
  turnCounter: 0,
  player1: '',
  player2: '',

  win: false,
  draw: false,
  winner: {method: "", cell: ""}},

  setCell: function(row, col) {
    var rowNumber = row.slice(3);
    var colNumber = col.slice(3);
    if (this.data.playerTurn === 1) {
      this.data.board[rowNumber][colNumber] = this.data.player1;
      this.gameStatus(rowNumber, colNumber, this.data.player1);
      return this.data.player1;
    } else {
      this.data.board[rowNumber][colNumber] = this.data.player2;
      this.gameStatus(rowNumber, colNumber, this.data.player2);
      return this.data.player2;
    }
    writeFB();
  },

  setPlayerSymbol: function(player, symbol) {
    if (player === 1) {
      game.data.player1 = symbol;
    } else {
      game.data.player2 = symbol;
    }
    writeFB();
  },

  setFirstTurn: function() {
    this.data.playerTurn = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    writeFB();
  },

  nextTurn: function() {
    if (this.data.playerTurn === 1) {
      this.data.playerTurn++;
    } else {
      this.data.playerTurn--;
    }
    writeFB();
  },

  gameStatus: function(rowNumber, colNumber, symbol) {

    if (this.data.board[rowNumber][0] === symbol && this.data.board[rowNumber][1] === symbol && this.data.board[rowNumber][2] === symbol) {
      this.data.win = true;
      this.data.winner.method = "row";
      this.data.winner.cell = "row" + rowNumber;
    }
    if (this.data.board[0][colNumber] === symbol && this.data.board[1][colNumber] === symbol && this.data.board[2][colNumber] === symbol) {
      this.data.win = true;
      this.data.winner.method = "col";
      this.data.winner.cell = "col" + colNumber;
    }
    if (this.data.board[0][0] === symbol && this.data.board[1][1] === symbol && this.data.board[2][2] === symbol) {
      this.data.win = true;
      this.data.winner.method = "diagonal";
      this.data.winner.cell = "TL";
    }
    if (this.data.board[2][0] === symbol && this.data.board[1][1] === symbol && this.data.board[0][2] === symbol) {
      this.data.win = true;
      this.data.winner.method = "diagonal";
      this.data.winner.cell = "TR";
    }
    this.data.turnCounter++;
    if (this.data.turnCounter === 9 && this.data.win === false) {
      this.data.draw = true;
    }
  },

  reset: function() {
    this.data.board = [[],[],[]];
    this.data.turnCounter = 0;
    this.data.win = false;
    this.data.draw = false;
    this.data.winner.method = "";
    this.data.winner.cell= "";
  }

}



var writeFB = function(){
    var data =  {
      board: game.data.board,
      playerTurn: game.data.playerTurn,
      turnCounter: game.data.turnCounter,
      player1: game.data.player1,
      player2: game.data.player2,
      win: game.data.win,
      draw: game.data.draw,
      winner: game.data.winner,
    };
    gameRef.set(data);
};

gameRef.on('value',function(FBdata) {
  game.data.board = FBdata.val().board,
  game.data.playerTurn = FBdata.val().playerTurn,
  game.data.turnCounter = FBdata.val().turnCounter
  game.data.player1 = FBdata.val().player1,
  game.data.player2 = FBdata.val().player2,
  game.data.win = FBdata.val().win,
  game.data.draw = FBdata.val().draw,
  game.data.winner = FBdata.val().winner
});

writeFB();
