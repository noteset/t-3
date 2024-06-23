const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const msg = document.getElementById("msg");
const players = ["X", "O"];
let current = players[0];

cells.forEach(cell => cell.addEventListener("click", handleCellClick));

function handleCellClick(event) {
    const cell = event.target;

    if (cell.textContent === "") {
        cell.textContent = current;
        if (checkWin()) {
            msg.textContent = `Player ${current} wins!`;
            cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
        } else if (checkTie()) {
            msg.textContent = "It's a draw!";
        } else {
            current = current === players[0] ? players[1] : players[0];
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => cells[index].textContent === current)
    );
}

function checkTie() {
    return Array.from(cells).every(cell => cell.textContent !== "");
}

function restart() {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.addEventListener("click", handleCellClick);
    });
    current = players[0];
    msg.textContent = "";
}

