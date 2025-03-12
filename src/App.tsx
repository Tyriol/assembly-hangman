import { useState } from "react";
import clsx from "clsx";
import "./App.css";
import languages from "./data/languages";

function App() {
  const [currentWord] = useState<string>("react");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const languageElements = languages.map((lang) => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    return (
      <span className="language" style={styles} key={lang.name}>
        {lang.name}
      </span>
    );
  });

  const letters = currentWord.split("").map((char, i) => (
    <span key={i} className="letter">
      {guessedLetters.includes(char) ? char.toUpperCase() : ""}
    </span>
  ));

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
      <button className={classNames} onClick={() => addGuessedLetter(char)} key={char}>
        {char.toUpperCase()}
      </button>
    );
  });

  return (
    <>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly</p>
      </header>
      <main>
        <section className="game-status">
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </section>
        <section className="languages">{languageElements}</section>
        <section className="letters">{letters}</section>
        <section className="keyboard">{keys}</section>
        <button className="new-game" type="button">
          New Game
        </button>
      </main>
    </>
  );
}

export default App;
