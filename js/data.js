var game = {

  board: [[],[],[]],

  playerTurn: 0,
  turnCounter: 0,
  player1: '',
  player2: '',

  win: false,
  draw: false,
  winner: {method: "", cell: ""},

  setCell: function(row, col) {
    var rowNumber = row.slice(3);
    var colNumber = col.slice(3);
    if (this.playerTurn === 1) {
      this.board[rowNumber][colNumber] = this.player1;
      this.gameStatus(rowNumber, colNumber, this.player1);
      return this.player1;
    } else {
      this.board[rowNumber][colNumber] = this.player2;
      this.gameStatus(rowNumber, colNumber, this.player2);
      return this.player2;
    }
  },

  setPlayerSymbol: function(player, symbol) {
    if (player === 1) {
      this.player1 = symbol;
    } else {
      this.player2 = symbol;
    }
  },

  setFirstTurn: function() {
    this.playerTurn = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
  },

  nextTurn: function() {
    if (this.playerTurn === 1) {
      this.playerTurn++;
    } else {
      this.playerTurn--;
    }
  },

  gameStatus: function(rowNumber, colNumber, symbol) {

    if (this.board[rowNumber][0] === symbol && this.board[rowNumber][1] === symbol && this.board[rowNumber][2] === symbol) {
      this.win = true;
      this.winner.method = "row";
      this.winner.cell = "row" + rowNumber;
    }
    if (this.board[0][colNumber] === symbol && this.board[1][colNumber] === symbol && this.board[2][colNumber] === symbol) {
      this.win = true;
      this.winner.method = "col";
      this.winner.cell = "col" + colNumber;
    }
    if (this.board[0][0] === symbol && this.board[1][1] === symbol && this.board[2][2] === symbol) {
      this.win = true;
      this.winner.method = "diagonal";
      this.winner.cell = "TL";
    }
    if (this.board[2][0] === symbol && this.board[1][1] === symbol && this.board[0][2] === symbol) {
      this.win = true;
      this.winner.method = "diagonal";
      this.winner.cell = "TR";
    }
    this.turnCounter++;
    if (this.turnCounter === 9 && this.win === false) {
      this.draw = true;
    }
  },

  reset: function() {
    this.board = [[],[],[]];
    this.turnCounter = 0;
    this.win = false;
    this.draw = false;
    this.winner.method = "";
    this.winner.cell= "";
  }

}
