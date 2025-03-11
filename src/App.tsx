import "./App.css";
import languages from "./data/languages";

function App() {
  const randomWord = "react";
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

  const letters = randomWord.split("").map((char, i) => {
    return (
      <span key={i} className="letter">
        {char.toUpperCase()}
      </span>
    );
  });

  const keys = alphabet.split("").map((char) => {
    return (
      <button className="key" key={char}>
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
