let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

let number = 0;

let winner = document.getElementById('winner');
  let currentPlayer = 'X';
  let gameOver = false;
  
  function makeMove(row, col) {
    if (!gameOver && board[row][col] === '') {
      board[row][col] = currentPlayer;
      renderBoard();
      checkWin();
      toggleCurrentPlayer();
      saveGame();
    }
  }
  
  function toggleCurrentPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
  
  function checkWin() {
    number += 1;
    console.log(number);
    let winningCombinations = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];
  
    for (let combination of winningCombinations) {
      let [a, b, c] = combination;
      let [aRow, aCol] = a;
      let [bRow, bCol] = b;
      let [cRow, cCol] = c;
  
      if (
        board[aRow][aCol] !== '' &&
        board[aRow][aCol] === board[bRow][bCol] &&
        board[aRow][aCol] === board[cRow][cCol]
      ) {
        winner.style.display = 'flex'
        winner.innerHTML = ('Победитель: ' + board[aRow][aCol]);
        gameOver = true;
        break;
      } else if (number === 9) {
        winner.style.display = 'flex'
        winner.innerHTML = 'Ничья'
      }
    }
  }
  
  function resetGame() {
    board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    currentPlayer = 'X';
    gameOver = false;
    winner.style.display = 'none'
    winner.innerHTML = '';
    number = 0;
    renderBoard();
    saveGame();
  }
  
  function renderBoard() {
    let cells = document.getElementsByClassName('cell');
    Array.from(cells).forEach(function(cell, index) {
      let row = Math.floor(index / 3);
      let col = index % 3;
      cell.innerText = board[row][col];
    });
  }
  
  function saveGame() {
    let gameData = {
      board: board,
      currentPlayer: currentPlayer,
      gameOver: gameOver
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
  }
  
  function loadGame() {
    let gameData = localStorage.getItem('gameData');
    if (gameData) {
      gameData = JSON.parse(gameData);
      board = gameData.board;
      currentPlayer = gameData.currentPlayer;
      gameOver = gameData.gameOver;
      renderBoard();
    }
  }
  
  renderBoard();
  loadGame();