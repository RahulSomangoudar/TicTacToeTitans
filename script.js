const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const popup = document.getElementById('popup');
const winnerMessage = document.getElementById('winnerMessage');
const closePopup = document.getElementById('closePopup');
const newGameButton = document.getElementById('newGameButton'); // New button
const startGameButton = document.getElementById('startGameButton');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const currentTurn = document.getElementById('currentTurn'); // New element
let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let player1Name = '';
let player2Name = '';

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] || checkWin()) return;

    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        showWinnerPopup(currentPlayer);
    } else if (boardState.every(cell => cell)) {
        showWinnerPopup('Draw');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateCurrentTurn(); // Update turn display
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] === currentPlayer;
        });
    });
}

function showWinnerPopup(winner) {
    if (winner === 'Draw') {
        winnerMessage.textContent = 'It\'s a Draw!';
    } else {
        const winnerName = winner === 'X' ? player1Name : player2Name;
        winnerMessage.textContent = `${winnerName} Wins!`;
    }
    popup.style.display = 'flex';
}

function resetBoard() {
    boardState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

function restartGame() {
    resetBoard();
    popup.style.display = 'none';
    updateCurrentTurn();
}

function newGame() {
    resetBoard();
    popup.style.display = 'none';
    board.style.display = 'none';
    player1Input.value = '';
    player2Input.value = '';
    player1Input.style.display = 'block';
    player2Input.style.display = 'block';
    startGameButton.style.display = 'block';
    currentTurn.style.display = 'none';
}

function startGame() {
    player1Name = player1Input.value || 'Player 1';
    player2Name = player2Input.value || 'Player 2';
    player1Input.style.display = 'none';
    player2Input.style.display = 'none';
    startGameButton.style.display = 'none';
    board.style.display = 'grid';
    currentTurn.style.display = 'block';
    updateCurrentTurn(); // Initialize turn display
}

function updateCurrentTurn() {
    const playerName = currentPlayer === 'X' ? player1Name : player2Name;
    currentTurn.textContent = `It's ${playerName}'s turn (${currentPlayer})`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
closePopup.addEventListener('click', restartGame); // Restart the game without new inputs
newGameButton.addEventListener('click', newGame); // New event listener for New Game button
startGameButton.addEventListener('click', startGame);
