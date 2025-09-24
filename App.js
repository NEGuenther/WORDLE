import React, { useState, useEffect } from "react";

/**
 * Lista de palavras possíveis para o jogo.
 */
const wordList = [
  "PIANO", "CASAS", "LIVRO", "CARRO", "FELIZ", "TERRA", "BANHO", "CINZA", "RATOS", "MELAO"
];

/**
 * Número máximo de tentativas permitidas.
 */
const maxAttempts = 5;

/**
 * Função que retorna uma palavra aleatória da lista.
 * @returns {string} Palavra sorteada
 */
function pickRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

/**
 * Componente principal do Wordle.
 */
export default function App() {
  // Palavra alvo do jogo
  const [targetWord, setTargetWord] = useState(pickRandomWord());
  // Lista de palpites feitos pelo usuário
  const [guesses, setGuesses] = useState([]);
  // Valor atual do input de texto
  const [input, setInput] = useState("");
  // Mensagem de feedback para o usuário
  const [message, setMessage] = useState("");

  /**
   * Exibe no console a palavra resposta toda vez que ela muda.
   */
  useEffect(() => {
    console.log("Palavra resposta:", targetWord);
  }, [targetWord]);

  /**
   * Loga os palpites sempre que mudam.
   */
  useEffect(() => {
    console.log("Palpites atuais:", guesses);
  }, [guesses]);

  /**
   * Loga o valor do input sempre que muda.
   */
  useEffect(() => {
    console.log("Input atual:", input);
  }, [input]);

  /**
   * Retorna o status da letra para estilização do tile.
   * @param {string} letter - Letra a ser verificada
   * @param {number} index - Posição da letra na palavra
   * @param {string} guess - Palpite atual
   * @returns {string} Classe CSS correspondente ao status
   */
  function getTileStatus(letter, index, guess) {
    if (targetWord[index] === letter) return "correct";
    if (targetWord.includes(letter)) return "present";
    return "absent";
  }

  /**
   * Processa o palpite do usuário ao clicar em "Adivinhar".
   * Valida o input, atualiza os palpites e mostra mensagens de vitória/derrota.
   */
  function handleGuess() {
    console.log("Tentando palpite:", input);
    if (input.length !== 5) {
      setMessage("A palavra deve ter 5 letras!");
      console.warn("Palpite inválido: menos de 5 letras");
      return;
    }
    if (guesses.length >= maxAttempts) {
      setMessage("Você atingiu o número máximo de tentativas!");
      console.warn("Tentativas esgotadas");
      return;
    }
    const newGuesses = [...guesses, input.toUpperCase()];
    setGuesses(newGuesses);
    setInput("");
    if (input.toUpperCase() === targetWord) {
      setMessage("Parabéns, você acertou!");
      console.log("Usuário acertou!");
    } else if (newGuesses.length === maxAttempts) {
      setMessage(`Você perdeu! A palavra era: ${targetWord}`);
      console.log("Usuário perdeu. Palavra era:", targetWord);
    } else {
      setMessage("");
    }
  }

  /**
   * Reinicia o jogo, sorteando uma nova palavra e limpando os estados.
   */
  function handleReset() {
    console.log("Jogo reiniciado");
    setTargetWord(pickRandomWord());
    setGuesses([]);
    setInput("");
    setMessage("");
  }

  /**
   * Renderiza o componente principal do Wordle.
   */
  return (
    <div className="container">
      <h1>Wordle Simples</h1>
      <div className="board">
        {/* Renderiza os tiles do tabuleiro */}
        {[...Array(maxAttempts)].map((_, rowIdx) =>
          [...Array(5)].map((_, colIdx) => {
            const guess = guesses[rowIdx];
            const letter = guess ? guess[colIdx] : "";
            let status = "";
            if (guess && letter) {
              status = getTileStatus(letter, colIdx, guess);
              console.log(`Tile [${rowIdx},${colIdx}] letra: ${letter}, status: ${status}`);
            }
            return (
              <div key={rowIdx * 5 + colIdx} className={`tile ${status}`}>
                {letter}
              </div>
            );
          })
        )}
      </div>
      {/* Mensagem de feedback */}
      <div id="message">{message}</div>
      {/* Controles de input e botões */}
      <div className="controls">
        <input
          type="text"
          maxLength={5}
          placeholder="Digite sua palavra"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={handleGuess}>Adivinhar</button>
        <button onClick={handleReset}>Reiniciar</button>
      </div>
    </div>
  );
}