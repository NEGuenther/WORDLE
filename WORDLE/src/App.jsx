import React, { useState, useEffect } from "react";
import './style.css';

const wordList = [
  "PIANO", "CASAS", "LIVRO", "CARRO", "FELIZ", "TERRA", "BANHO", "CINZA", "RATOS", "MELAO"
];
const maxAttempts = 5;

function pickRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

/**
 * Função que retorna o status de cada letra do palpite em relação à palavra alvo,
 * seguindo a lógica do Wordle original (trata letras repetidas corretamente).
 * @param {string} guess - Palpite do usuário
 * @param {string} target - Palavra alvo
 * @returns {Array<string>} Array com status: "correct", "present" ou "absent"
 */
function getGuessStatuses(guess, target) {
  const guessArr = guess.split("");
  const targetArr = target.split("");
  const statuses = Array(5).fill("absent");
  const targetUsed = Array(5).fill(false);

  // Primeiro passo: marcar "correct"
  for (let i = 0; i < 5; i++) {
    if (guessArr[i] === targetArr[i]) {
      statuses[i] = "correct";
      targetUsed[i] = true;
    }
  }

  // Segundo passo: marcar "present"
  for (let i = 0; i < 5; i++) {
    if (statuses[i] === "correct") continue;
    for (let j = 0; j < 5; j++) {
      if (!targetUsed[j] && guessArr[i] === targetArr[j]) {
        statuses[i] = "present";
        targetUsed[j] = true;
        break;
      }
    }
  }

  return statuses;
}

export default function App() {
  const [targetWord, setTargetWord] = useState(pickRandomWord());
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("Palavra resposta:", targetWord);
  }, [targetWord]);

  function handleGuess() {
    const sanitizedInput = input
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-Za-z]/g, "")
      .toUpperCase();

    if (sanitizedInput.length !== 5) {
      setMessage("A palavra deve ter 5 letras e apenas letras!");
      return;
    }
    if (guesses.length >= maxAttempts) {
      setMessage("Você atingiu o número máximo de tentativas!");
      return;
    }
    const newGuesses = [...guesses, sanitizedInput];
    setGuesses(newGuesses);
    setInput("");
    if (sanitizedInput === targetWord) {
      setMessage("Parabéns, você acertou!");
    } else if (newGuesses.length === maxAttempts) {
      setMessage(`Você perdeu! A palavra era: ${targetWord}`);
    } else {
      setMessage("");
    }
  }

  function handleReset() {
    setTargetWord(pickRandomWord());
    setGuesses([]);
    setInput("");
    setMessage("");
  }

  return (
    <div className="container">
      <h1>Wordle Simples</h1>
      <div className="board">
        {[...Array(maxAttempts)].map((_, rowIdx) => {
          const guess = guesses[rowIdx];
          const letters = guess ? guess.split("") : [];
          const statuses = guess ? getGuessStatuses(guess, targetWord) : [];
          return [...Array(5)].map((_, colIdx) => (
            <div
              key={rowIdx * 5 + colIdx}
              className={`tile ${statuses[colIdx] || ""}`}
            >
              {letters[colIdx] || ""}
            </div>
          ));
        })}
      </div>
      {message && (
        <div className="input" id="message">{message}</div>
      )}
      <div className="controls">
        <input
          type="text"
          maxLength={5}
          placeholder="Digite sua palavra"
          value={input}
          onChange={e => {
            const value = e.target.value
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[^A-Za-z]/g, "")
              .toUpperCase();
            setInput(value);
          }}
          onKeyDown={e => {
            if (e.key === "Enter" && input.length === 5) {
              handleGuess();
            }
          }}
        />
        <button
          onClick={handleGuess}
          disabled={input.length !== 5}
        >
          Adivinhar
        </button>
        <button onClick={handleReset}>Reiniciar</button>
      </div>
    </div>
  );
}