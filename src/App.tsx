import { useState } from "react";
import clsx from "clsx";
import Confetti from "react-confetti";
import "./App.css";
import languages from "./data/languages";
import { getFarewellMessage, getRandomWord } from "./helpers/utils";

function App() {
  const [currentWord, setCurrentWord] = useState<string>(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const wrongGuessCount: number = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord.split("").every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount === languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const lastGuess = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect = lastGuess && !currentWord.includes(lastGuess);
  const numGuessesLeft = languages.length - 1 - wrongGuessCount;

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const languageElements = languages.map((lang, i) => {
    const lostLanguage = i < wrongGuessCount;
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    const classNames = clsx("language", lostLanguage && "lost");
    return (
      <span className={classNames} style={styles} key={lang.name}>
        {lang.name}
      </span>
    );
  });

  const letters = currentWord.split("").map((char, i) => {
    const lettersClassName = clsx(
      "letter",
      isGameLost && !guessedLetters.includes(char) && "game-lost"
    );
    return (
      <span key={i} className={lettersClassName}>
        {guessedLetters.includes(char) || isGameLost ? char.toUpperCase() : ""}
      </span>
    );
  });

  function addGuessedLetter(letter: string) {
    setGuessedLetters((prevGuesses) =>
      prevGuesses.includes(letter) ? prevGuesses : [...prevGuesses, letter]
    );
  }

  const keys = alphabet.split("").map((char) => {
    const isGuessed = guessedLetters.includes(char);
    const isCorrect = isGuessed && currentWord.includes(char);
    const isIncorrect = isGuessed && !currentWord.includes(char);
    const classNames = clsx({
      correct: isCorrect,
      incorrect: isIncorrect,
    });
    return (
      <button
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(char)}
        aria-label={`letter ${char}`}
        className={classNames}
        onClick={() => addGuessedLetter(char)}
        key={char}
      >
        {char.toUpperCase()}
      </button>
    );
  });

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return <p>{getFarewellMessage(languages[wrongGuessCount - 1].name)}</p>;
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }

    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }

    return null;
  }

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    wrong: isLastGuessIncorrect && !isGameOver,
  });

  function newGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  return (
    <>
      {isGameWon && <Confetti numberOfPieces={1000} recycle={false} />}
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly</p>
      </header>
      <main>
        <section aria-live="polite" role="status" className={gameStatusClass}>
          {renderGameStatus()}
        </section>
        <section className="languages">{languageElements}</section>
        <section className="letters">{letters}</section>
        <section className="sr-only" aria-live="polite" role="status">
          {guessedLetters.length > 0 && (
            <p>
              {currentWord.includes(lastGuess)
                ? `Correct! The word contains ${lastGuess.toUpperCase()}`
                : `Sorry, the word does not contain the letter ${lastGuess.toUpperCase()}`}{" "}
              You have {numGuessesLeft} guesses left
            </p>
          )}
          <p>
            The Current word is:{" "}
            {currentWord
              .split("")
              .map((char) => {
                return guessedLetters.includes(char) ? `${char.toUpperCase()}.` : "blank";
              })
              .join(" ")}
          </p>
        </section>
        <section className="keyboard">{keys}</section>
        <div className="new-game">
          {isGameOver && (
            <button onClick={newGame} type="button">
              New Game
            </button>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
