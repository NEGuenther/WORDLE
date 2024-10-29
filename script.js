const targetWord = "piano";
let currentGuess = [];
let row = 0;
let gameWon = false;

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("grid");
    for (let i = 0; i < 30; i++) { // 6 linhas de 5 colunas
        const cell = document.createElement("div");
        grid.appendChild(cell);
    }
});

function typeLetter(letter) {
    if (currentGuess.length < 5 && !gameWon) {
        currentGuess.push(letter);
        updateGrid();
    }
}

function deleteLetter() {
    if (currentGuess.length > 0 && !gameWon) {
        currentGuess.pop();
        updateGrid();
    }
}

function submitGuess() {
    if (currentGuess.length !== 5 || gameWon) return;

    const guess = currentGuess.join("").toLowerCase();
    const rowCells = Array.from(document.querySelectorAll(".grid div")).slice(row * 5, row * 5 + 5);

    currentGuess.forEach((letter, index) => {
        const cell = rowCells[index];
        if (letter === targetWord[index]) {
            cell.classList.add("correct-position");
        } else if (targetWord.includes(letter)) {
            cell.classList.add("wrong-position");
        }
        cell.textContent = letter;
    });

    if (guess === targetWord) {
        alert("Parabéns! Você acertou a palavra!");
        gameWon = true;
    }

    currentGuess = [];
    row++;
}

function updateGrid() {
    const rowCells = Array.from(document.querySelectorAll(".grid div")).slice(row * 5, row * 5 + 5);
    rowCells.forEach((cell, index) => {
        cell.textContent = currentGuess[index] || "";
    });
}
