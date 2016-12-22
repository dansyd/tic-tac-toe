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


  checkAIPossibleWin: function(row, col) {
    var AICounter = 0;
    var freeCell = [];
    //check row first
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j <3; j++) {
        if (this.board[i][j] === this.player2) {
          AICounter++;
        } else if ((this.board[i][j] === '')) {
          freeCell.push([i, j]);
        }
      }
      if (AICounter === 2 && freeCell.length === 1 && freeCell[0]!== this.player1) {
        return [freeCell[0][0], freeCell[0][1]];
      }
      AICounter = 0;
      freeCell = [];
    }
    //check for column
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j <3; j++) {
        if (this.board[j][i] === this.player2) {
          AICounter++;
        } else if ((this.board[j][i] === '')) {
          freeCell.push([j, i]);
        }
      }
      if (AICounter === 2 && freeCell.length === 1 && freeCell[0]!== this.player1) {
        return [freeCell[0][0], freeCell[0][1]];
      }
      AICounter = 0;
      freeCell = [];
    }
    //check for diagonal
    var j = 2;
    for (var i = 0; i < 3; i++) {
      if (this.board[i][j] === this.player2) {
        AICounter++;
      } else if ((this.board[i][j] === '')) {
        freeCell.push([i, j]);
      }
      j--;
    }
    if (AICounter === 2 && freeCell.length === 1 && freeCell[0]!== this.player1) {
      return [freeCell[0][0], freeCell[0][1]];
    }
  },

  calculateAIMove: function() {

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

    // If Attacking and 3rd turn
    if (this.AIAttacking) {
      if (this.turnCounter === 2) {
        // if middle free, take a free corner
        for (var i = 0; i <= 2; i+=2 ) {
          for (var j = 2; j >= 0; j-=2) {
            if (this.board[i][j] === "") {
              return this.setAICell(i,j);
            }
          }
        }
      }

      if (this.turnCounter === 4) {
        // check for possible win
        var winningCell = this.checkAIPossibleWin(0, 0);
        if (winningCell) {
          return this.setAICell(winningCell[0], winningCell[1]);
        }
        // if not, take the other corner
        for (var i = 0; i <= 2; i+=2 ) {
          for (var j = 2; j >= 0; j-=2) {
            if (this.board[i][j] === "") {
              return this.setAICell(i,j);
            }
          }
        }
      }

      if (this.turnCounter === 6) {
        // check for possible win in row 0 and column 0
        var winningCell = this.checkAIPossibleWin(0, 2);
        if (winningCell) {
          return this.setAICell(winningCell[0], winningCell[1]);
        }
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
