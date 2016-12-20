var game = {

  board: [[],[],[]],

  playerTurn: 0,
  player1: '',
  player2: '',

  winner: false,

  setCell: function(row, col) {
    var rowNumber = row.slice(3);
    var colNumber = col.slice(3);
    var cell = this.board[rowNumber][colNumber];
    if (!cell) {
      if (this.playerTurn === 1) {
        this.board[rowNumber][colNumber] = this.player1;
        this.checkWin(rowNumber, colNumber, this.player1);
        return this.player1;
      } else {
        this.board[rowNumber][colNumber] = this.player2;
        this.checkWin(rowNumber, colNumber, this.player2);
        return this.player2;
      }
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

  checkWin: function(row, col, symbol) {
    if (this.board[row][0] === symbol && this.board[row][1] === symbol && this.board[row][2] === symbol) {
      this.winner = true;
    }
    if (this.board[0][col] === symbol && this.board[1][col] === symbol && this.board[2][col] === symbol) {
      this.winner = true;
    }
    if ((this.board[0][0] === symbol && this.board[1][1] === symbol && this.board[2][2] === symbol) || (this.board[2][0] === symbol && this.board[1][1] === symbol && this.board[0][2] === symbol)) {
      this.winner = true;
    }
  }



}
