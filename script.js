let board = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
];

let currentPlayer = 'X';
let selectedCells = [];
let moveHistory = [];

function makeMove(row, col) {
    if (board[row][col] === '') {
        // Allow the player to input two elements
        selectedCells.push({ row, col });
        document.getElementById('board').children[row * 4 + col].innerHTML = currentPlayer;

        if (selectedCells.length === 2) {
            board[selectedCells[0].row][selectedCells[0].col] = currentPlayer;
            board[selectedCells[1].row][selectedCells[1].col] = currentPlayer;
            moveHistory.push({ cells: [...selectedCells], player: currentPlayer });

            if (checkWinner()) {
                alert(`Player ${currentPlayer} wins!`);
                resetBoard();
            } else if (isBoardFull()) {
                alert("It's a draw!");
                resetBoard();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }

            // Reset selected cells
            selectedCells = [];
        }
    }
}
function undoMove() {
    if (moveHistory.length > 0) {
        const lastMove = moveHistory.pop();
        lastMove.cells.forEach(cell => {
            const { row, col } = cell;
            board[row][col] = '';
            document.getElementById('board').children[row * 4 + col].innerHTML = '';
        });

        // Switch to the other player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        
        // If the last move was the second input of a player, switch back to that player
        if (lastMove.cells.length === 2) {
            currentPlayer = lastMove.player;
        }
    }
}


function checkWinner() {
    // Check rows and columns
    for (let i = 0; i < 4; i++) {
        if (
            board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][2] === board[i][3] &&
            board[i][0] !== ''
        ) {
            return true;
        }
        if (
            board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[2][i] === board[3][i] &&
            board[0][i] !== ''
        ) {
            return true;
        }
    }

    // Check diagonals
    if (
        (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] === board[3][3] && board[0][0] !== '') ||
        (board[0][3] === board[1][2] && board[1][2] === board[2][1] && board[2][1] === board[3][0] && board[0][3] !== '')
    ) {
        return true;
    }

    return false;
}

function isBoardFull() {
    for (let row of board) {
        if (row.includes('')) {
            return false;
        }
    }
    return true;
}

function resetBoard() {
    board = [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
    ];
    currentPlayer = 'X';
    selectedCells = [];
    moveHistory = [];
    for (let i = 0; i < 16; i++) {
        document.getElementById('board').children[i].innerHTML = '';
    }
}
