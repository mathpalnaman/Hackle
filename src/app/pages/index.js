import { useState, useEffect } from 'react';
import GameBoard from '../components/GameBoard';
import Keyboard from '../components/Keyboard';
import styles from '../styles/Home.module.css';
import wordList from '../utils/wordList'; // Predefined list of words

const WordleGame = () => {
  // const [targetWord, setTargetWord] = useState(''); //target stored
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');

  useEffect(() => {
    // Pick a random word when the component mounts
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setTargetWord(randomWord); //seting target
  }, []);

  const handleKeyPress = (key) => {
    if (key === 'Enter' && currentGuess.length === 5) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess('');
    } else if (key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 5 && /^[a-zA-Z]$/.test(key)) {
      setCurrentGuess(currentGuess + key.toLowerCase());
    }
  };

  return (
    <div className={styles.container}>
      <GameBoard guesses={guesses} currentGuess={currentGuess} />
      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
};

export default WordleGame;