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
    if (this.gameOver) return;

    let coords = event.target.id.split("-");
    let c = parseInt(coords[1]);
    let r = this.currColumns[c];

    if (r < 0) return;

    this.board[r][c] = this.currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (this.currPlayer == this.playerRed) {
      tile.classList.add("red-piece");
      this.currPlayer = this.playerYellow;
    } else {
      tile.classList.add("yellow-piece");
      this.currPlayer = this.playerRed;
    }

    r -= 1;
    this.currColumns[c] = r;

    this.checkWinner();
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
}

// Usage
window.onload = function () {
  const game = new ConnectFour();
  game.setGame();
};

module.exports = ConnectFour;