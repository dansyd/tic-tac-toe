var game = {

  board: [[],[],[]],

  playerTurn: 0,
  player1: '',
  player2: '',

  setCell: function(row, col) {
    var rowNumber = row.slice(3);
    var colNumber = col.slice(3);
    var cell = this.board[rowNumber][colNumber];
    if (!cell) {
      if (this.playerTurn === 1) {
        this.board[rowNumber][colNumber] = this.player1;
        return this.player1;
      } else {
        this.board[rowNumber][colNumber] = this.player2;
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

  setTurn: function() {
    this.playerTurn = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
  }

}
