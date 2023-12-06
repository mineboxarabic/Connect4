var assert = require('assert');
const { expect } = require('chai');
const { JSDOM } = require('jsdom');


const jsdom = new JSDOM(`<!doctype html><html><body>
<div class="toolsContainer">
<div>
    <h1 id="player1">Player 1 (RED)</h1>
</div>
<button id="reset">Reset</button>
<div>
    <h1 id="player2">Player 2 (YELLOW)</h1>
</div>        
</div>
<h2 id="winner"></h2>
<div id="board"></div>
<div id="buttonContainer">
<button id="reverse-0" class="reverse">reverse</button>
<button id="reverse-1" class="reverse">reverse</button>
<button id="reverse-2" class="reverse">reverse</button>
<button id="reverse-3" class="reverse">reverse</button>
<button id="reverse-4" class="reverse">reverse</button>
<button id="reverse-5" class="reverse">reverse</button>
<button id="reverse-6" class="reverse">reverse</button>

</div>

</body></html>`, { url: "http://localhost" });
const { window } = jsdom;

// Define global variables to simulate a browser environment
global.window = window;
global.document = window.document;
global.navigator = window.navigator;



const ConnectFour = require('../ConnectFour');

describe('ConnectFour', () => {
  let game;

  beforeEach(() => {
    game = new ConnectFour();
    game.setGame();
  });

  describe('Constructor', () => {
    it('should initialize with correct default values', () => {
      expect(game.playerRed).to.equal("R");
      expect(game.playerYellow).to.equal("Y");
      expect(game.currPlayer).to.equal("R");
      expect(game.gameOver).to.be.false;
      const expectedBoard =  new Array(6).fill(null).map(() => new Array(7).fill(' '));
      expect(game.board).to.deep.equal(expectedBoard);

      expect(game.rows).to.equal(6);
      expect(game.columns).to.equal(7);
      expect(game.currColumns).to.deep.equal([5, 5, 5, 5, 5, 5, 5]);
    });
  });

  describe('setGame', () => {
    it('should initialize the game board correctly', () => {
      game.setGame();
      expect(game.board.length).to.equal(6);
      game.board.forEach(row => {
        expect(row.length).to.equal(7);
        expect(row.every(cell => cell === ' ')).to.be.true;
      });
    });
  });

  describe('setPiece', () => {
    it('should correctly set a piece on the board', () => {
        // Assuming setPiece is called with a column index
        game.setPiece({ target: { id: '5-0' } });
 
        const expectedRow = game.rows - 1;

        expect(game.board[expectedRow][0]).to.equal(game.playerRed);
        
    });
});

  describe('checkWinner', () => {
    it('should correctly identify a winner', () => {

        for (let i = 0; i < 4; i++) {
            game.board[0][i] = game.playerRed;
        }
        game.checkWinner();
        
        //check if the winner is red
        game.setWinner(0,2);
        expect(game.winner).to.equal(game.playerRed);
        expect(game.gameOver).to.be.true;
        
    });
  });

  describe('checkWinnerHorizontal', () => {

    it('should correctly identify a winner horizontally', () => {
        
        for (let i = 0; i < 4; i++) {
            game.board[0][i] = game.playerRed;
        }
        game.checkWinnerHorizontalHelper();
        expect(game.winner).to.equal(game.playerRed);
        expect(game.gameOver).to.be.true;
    });
  });

  describe('checkWinnerVertical', () => {
    it('should correctly identify a winner vertically', () => {
        for (let i = 0; i < 4; i++) {
            game.board[i][0] = game.playerRed;
        }
        game.checkWinnerVerticalHelper();
        expect(game.winner).to.equal(game.playerRed);
        expect(game.gameOver).to.be.true;
    });
  });

  describe('checkWinnerAntiDiagonal', () => {
    it('should correctly identify a winner anti-diagonally', () => {
        for (let i = 0; i < 4; i++) {
            game.board[i][i] = game.playerRed;
        }
        game.checkWinnerAntiDiagonalHelper();
        expect(game.winner).to.equal(game.playerRed);
        expect(game.gameOver).to.be.true;
    });
  }
  
    );

 
    describe('checkWinner', () => {
      it('should correctly identify a winner diagonally', () => {
          game.board[5][0] = game.playerRed; 
          game.board[4][1] = game.playerRed; 
          game.board[3][2] = game.playerRed; 
          game.board[2][3] = game.playerRed; 
  

          game.checkWinner();
          expect(game.winner).to.equal(game.playerRed);
      });
  });


  describe('gameOver', () => {
    it('should end the game when a winner is found', () => {
        // Manually set up a winning condition and call checkWinner
        for (let i = 0; i < 4; i++) {
            game.board[0][i] = game.playerRed;
        }
        game.checkWinner();
        expect(game.gameOver).to.be.true;
    });
  });


  describe('reverse collumn', () => {

    it('should reverse the collumn', () => {
        game.board[5][0] = game.playerRed; 
        game.board[4][0] = game.playerYellow; 
        game.board[3][0] = game.playerYellow; 
        game.board[2][0] = game.playerRed; 
        game.board[1][0] = game.playerRed; 
        game.board[0][0] = game.playerRed; 

        game.reverse();
        expect(game.board[5][0]).to.equal(game.playerRed);
        expect(game.board[4][0]).to.equal(game.playerRed);
        expect(game.board[3][0]).to.equal(game.playerRed);
        expect(game.board[2][0]).to.equal(game.playerYellow);
        expect(game.board[1][0]).to.equal(game.playerYellow);
        expect(game.board[0][0]).to.equal(game.playerRed);

      });
  })
});