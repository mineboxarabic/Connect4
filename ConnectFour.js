class ConnectFour {
  constructor() {
    this.playerRed = "R";
    this.playerYellow = "Y";
    this.currPlayer = this.playerRed;
    this.gameOver = false;
    this.board = [];
    this.rows = 6;
    this.columns = 7;
    this.currColumns = new Array(this.columns).fill(this.rows - 1);
    this.winner = null;
    this.reverseButton = document.getElementById("reverse");
    this.reverseButton.addEventListener("click", this.reverse.bind(this));
  }

  setGame() {
    this.board = [];
    this.currColumns = new Array(this.columns).fill(this.rows - 1);

    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.columns; c++) {
        row.push(" ");
        let tile = document.createElement("div");
        tile.id = r.toString() + "-" + c.toString();
        tile.classList.add("tile");
        tile.addEventListener("click", this.setPiece.bind(this));
        document.getElementById("board").append(tile);
      }
      this.board.push(row);
    }
  }

  setPiece(event) {
    if (this.gameOver) {
      return;
    }

    // Assuming this function is called by an event listener attached to column headers
    const xy = event.target.id.split("-");
    let columnIndex = parseInt(xy[1]);

    // Find the first available row from the bottom in the selected column
    let rowIndex = this.findAvailableRow(columnIndex);
    console.log(rowIndex);
    if (rowIndex === -1) {
      // Column is full
      return;
    }

    // Create the piece element
    let piece = document.createElement("div");
    piece.classList.add("piece");
    if (this.currPlayer === this.playerRed) {
      piece.classList.add("red-piece");
    } else {
      piece.classList.add("yellow-piece");
    }

    // Append the piece to the board and apply the falling animation
    let targetCell = document.getElementById(`${rowIndex}-${columnIndex}`);
    console.log(targetCell);
    targetCell.appendChild(piece);
    piece.classList.add("falling-piece");

    // Update the game board array
    this.board[rowIndex][columnIndex] = this.currPlayer;

    // Animation end event listener
    piece.addEventListener("animationend", () => {
      piece.classList.remove("falling-piece");
      console.log(this.currPlayer);
      // Check for a winner
      if (this.checkWinner(rowIndex, columnIndex)) {
        this.gameOver = true;
        // Handle the win (show message, etc.)
        return;
      }
    });

    if (this.currPlayer === this.playerRed) {
      this.currPlayer = this.playerYellow;
    } else {
      this.currPlayer = this.playerRed;
    }
  }
  findAvailableRow(columnIndex) {
    for (let i = this.rows - 1; i >= 0; i--) {
      if (this.board[i][columnIndex] === " ") {
        return i;
      }
    }
    return -1; // Column is full
  }
  checkWinner() {
    this.checkWinnerHorizontalHelper();
    this.checkWinnerVerticalHelper();
    this.checkWinnerAntiDiagonalHelper();
    this.checkWinnerDiagonalHelper();
  }

  checkWinnerHorizontalHelper() {
    const rows = this.rows;
    const columns = this.columns;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns - 3; c++) {
        if (this.board[r][c] != " ") {
          if (
            this.board[r][c] == this.board[r][c + 1] &&
            this.board[r][c + 1] == this.board[r][c + 2] &&
            this.board[r][c + 2] == this.board[r][c + 3]
          ) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }
  }

  checkWinnerVerticalHelper() {
    const rows = this.rows;
    const columns = this.columns;
    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < rows - 3; r++) {
        if (this.board[r][c] != " ") {
          if (
            this.board[r][c] == this.board[r + 1][c] &&
            this.board[r + 1][c] == this.board[r + 2][c] &&
            this.board[r + 2][c] == this.board[r + 3][c]
          ) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }
  }

  checkWinnerAntiDiagonalHelper() {
    const rows = this.rows;
    const columns = this.columns;
    for (let r = 0; r < rows - 3; r++) {
      for (let c = 0; c < columns - 3; c++) {
        if (this.board[r][c] != " ") {
          if (
            this.board[r][c] == this.board[r + 1][c + 1] &&
            this.board[r + 1][c + 1] == this.board[r + 2][c + 2] &&
            this.board[r + 2][c + 2] == this.board[r + 3][c + 3]
          ) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }
  }

  checkWinnerDiagonalHelper() {
    const rows = this.rows;
    const columns = this.columns;
    for (let r = 3; r < rows; r++) {
      for (let c = 0; c < columns - 3; c++) {
        if (this.board[r][c] != " ") {
          if (
            this.board[r][c] == this.board[r - 1][c + 1] &&
            this.board[r - 1][c + 1] == this.board[r - 2][c + 2] &&
            this.board[r - 2][c + 2] == this.board[r - 3][c + 3]
          ) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }
  }

  setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (this.board[r][c] == this.playerRed) {
      winner.innerText = "Red Wins";
      this.winner = this.playerRed;
    } else {
      winner.innerText = "Yellow Wins";
      this.winner = this.playerYellow;
    }
    this.gameOver = true;
  }

  reverse() {
    let board = document.getElementById("board");
    let children = board.childNodes;

    let reversedVertically = [];

    let rowsNumber = this.rows;




    

  }
}

// Usage
window.onload = function () {
  const game = new ConnectFour();
  game.setGame();
};

module.exports = ConnectFour;
