var game = {

  board: [[],[],[]],

  player1: '',
  player2: '',

  checkCell: function(row, col) {
    var rowNumber = row.slice(3);
    var colNumber = col.slice(3);
    return this.board[rowNumber][colNumber];
  },

  setCell: function(row, col, symbol) {
    var rowNumber = row.slice(3);
    var colNumber = col.slice(3);
    if (this.board[rowNumber] && this.board[rowNumber][colNumber]) {
      this.board[rowNumber][colNumber] = symbol;
    }
  },

  setPlayerSymbol: function(player, symbol) {
    if (player === 1) {
      this.player1 = symbol;
    } else {
      this.player2 = symbol;
    }
  }

}
