import { useState } from "react";
import "./App.css";
import languages from "./data/languages";

function App() {
  const [currentWord] = useState<string>("react");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  console.log(guessedLetters);

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

  const letters = currentWord.split("").map((char, i) => {
    return (
      <span key={i} className="letter">
        {char.toUpperCase()}
      </span>
    );
  });

  function addGuessedLetter(letter: string) {
    setGuessedLetters((prevGuesses) =>
      prevGuesses.includes(letter) ? prevGuesses : [...prevGuesses, letter]
    );
  }

  const keys = alphabet.split("").map((char) => {
    return (
      <button onClick={() => addGuessedLetter(char)} className="key" key={char}>
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
