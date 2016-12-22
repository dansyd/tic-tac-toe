var game = {

  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],

  playerTurn: 0,
  turnCounter: 0,
  player1: '',
  player2: '',
  AIActive: false,
  AIAttacking: false,
  AIDefending: false,

  win: false,
  draw: false,
  winner: {method: "", cell: ""},

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

  activateAI: function() {
    this.AIActive = true;
  },

  setCell: function(row, col) {
    var rowNumber = row.slice(3);
    var colNumber = col.slice(3);
    var cell = this.board[rowNumber][colNumber];
    if (!cell) {
      if (this.playerTurn === 1) {
        this.board[rowNumber][colNumber] = this.player1;
        this.gameStatus(rowNumber, colNumber, this.player1);
        return this.player1;
      } else {
        this.board[rowNumber][colNumber] = this.player2;
        this.gameStatus(rowNumber, colNumber, this.player2);
        return this.player2;
      }
    }
  },

  nextTurn: function() {
    if (this.playerTurn === 1) {
      // human player
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


  setAICell: function(rowNumber, colNumber) {
    this.board[rowNumber][colNumber] = this.player2;
    this.gameStatus(rowNumber, colNumber, this.player2);
    return [rowNumber, colNumber];
  },

  calculateAIMove: function() {
    // var rowNumber = 0;
    // var colNumber = 0;
    var corners = [[0, 0], [0, 2], [2, 0], [2, 2]];
    var sides = [[1, 0], [2, 1], [1, 2], [0, 1]];

    if (this.turnCounter === 0) {
      // First move -> Attacking
      this.AIAttacking = true;

      //take a corner
      return this.setAICell(0, 0);

    }

    if (this.turnCounter === 1) {
      // Second move -> Defending
      this.AIDefending = true;

      // Take the middle if free. If not, take a corner
      if (this.board[1][1] === ''){
        return this.setAICell(1, 1);
      } else {
        //take a corner
        return this.setAICell(0, 0);
      }
    }

    // If Attacking and 3rd turn, check if player1 took middle
    if (this.AIAttacking && this.turnCounter === 2) {
      // if not, take row +2 or col +2, whichever free
      if (this.board[1][1] === '') {
        if (this.board[0][2] === '') {
          return this.setAICell(0, 2);
        } else if (this.board[2][0] === '') {
          return this.setAICell(2, 0);
        }
      // if middle is taken, take the opposite diagonal (2,2)
      } else {
        return this.setAICell(2, 2);
      }
    }

  },

  reset: function() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.turnCounter = 0;
    this.win = false;
    this.draw = false;
    this.winner.method = "";
    this.winner.cell= "";
  }

}
