    const targetWord = "CASAS"; // Palavra fixa para adivinhar
    let guesses = [];
    const maxAttempts = 5;
    
    function createBoard() {
      const board = document.getElementById('board');
      board.innerHTML = '';
      for (let i = 0; i < maxAttempts * 5; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        board.appendChild(tile);
      }
    }

    function updateBoard() {
      const tiles = document.querySelectorAll('.tile');
      tiles.forEach((tile, i) => {
        const row = Math.floor(i / 5);
        const col = i % 5;
        const guess = guesses[row];
        tile.textContent = '';
        tile.className = 'tile';
        if (guess) {
          tile.textContent = guess[col] || '';
          if (guess[col]) {
            const status = getTileStatus(guess[col], col);
            tile.classList.add(status);
          }
        }
      });
    }

    function getTileStatus(letter, index) {
      if (targetWord[index] === letter) return 'correct';
      if (targetWord.includes(letter)) return 'present';
      return 'absent';
    }

    function makeGuess() {
      const input = document.getElementById('guessInput');
      const guess = input.value.toUpperCase();

      if (guess.length !== 5) {
        showMessage("A palavra deve ter 5 letras!");
        return;
      }
      if (guesses.length >= maxAttempts) {
        showMessage("Você atingiu o número máximo de tentativas!");
        return;
      }

      guesses.push(guess);
      updateBoard();
      input.value = '';

      if (guess === targetWord) {
        showMessage("Parabéns, você acertou!");
      } else if (guesses.length === maxAttempts) {
        showMessage(`Você perdeu! A palavra era: ${targetWord}`);
      }
    }

    function showMessage(message) {
      const messageDiv = document.getElementById('message');
      messageDiv.textContent = message;
    }

    function resetGame() {
      guesses = [];
      createBoard();
      showMessage('');
    }

    createBoard();