"use client";
import React, { useState } from "react";
import words from "@/data/Words 5";
import Keyboard from "@/components/Keyboard";
import BinaryBackground from "@/components/BinaryBackground";

const Hackle: React.FC = () => {
  const [likes, setLikes] = useState<number>(0);
  const [guess, setGuess] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [grid, setGrid] = useState<string[]>([""]);
  const [usedLetters, setUsedLetters] = useState<Record<string, string>>({});

  const targetValue: string = "ARRAY"; // TODO: set random word daily

  // Validate word (local version; replace with Gemini API if needed)
  const isWordValid = (word: string): boolean => {
    const lower = word.toLowerCase();
    return words.valid.includes(lower) || words.words.includes(lower);
  };

  const handleClick = async (): Promise<void> => {
    if (guess.length !== 5 || likes >= 6) return;

    const valid = isWordValid(guess);
    if (!valid) {
      setResult("invalid input");
      return;
    }

    setLikes((prev) => prev + 1);
    setGrid((prevGrid) => [...prevGrid, guess]);
    setGuess("");
    updateUsedLetters(guess);

    if (likes === 5 && guess !== targetValue) {
      setResult("you lose hehe loser");
      return;
    }

    if (guess === targetValue) {
      setResult("YOU WIN");
    }
  };

  const updateUsedLetters = (currentGuess: string): void => {
    const newUsedLetters = { ...usedLetters };

    currentGuess.split("").forEach((letter, index) => {
      const color = getLetterColor(letter, index);
      if (color === "bg-green-500") {
        newUsedLetters[letter] = "green";
      } else if (color === "bg-yellow-500" && newUsedLetters[letter] !== "green") {
        newUsedLetters[letter] = "yellow";
      } else if (!newUsedLetters[letter]) {
        newUsedLetters[letter] = "gray";
      }
    });

    setUsedLetters(newUsedLetters);
  };

  const getLetterColor = (letter: string, index: number): string => {
    if (targetValue[index] === letter) {
      return "bg-green-500";
    } else if (targetValue.includes(letter)) {
      return "bg-yellow-500";
    }
    return "bg-gray-500";
  };

  const handleKeyboardClick = (key: string): void => {
    if (key === "ENTER") {
      handleClick();
    } else if (key === "DELETE") {
      setGuess((prev) => prev.slice(0, -1));
    } else if (guess.length < 5) {
      setGuess((prev) => prev + key);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-black flex flex-col items-center justify-center overflow-hidden">
      <BinaryBackground />

      <div className="relative z-10">
        <h3 className="text-2xl font-semibold mb-4">Your Guesses:</h3>

        <ul className="space-y-2">
          {grid.map((word, index) => (
            <li key={index} className="flex gap-2 justify-center">
              {word.split("").map((letter, i) => (
                <span
                  key={i}
                  className={`text-white p-3 rounded-md text-lg font-bold ${getLetterColor(letter, i)}`}
                >
                  {letter}
                </span>
              ))}
            </li>
          ))}
        </ul>

        <input
          value={guess}
          onChange={(e) => setGuess(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && handleClick()}
          placeholder="Guess here"
          type="text"
          id="guess"
          className="mt-4 p-2 border-2 border-gray-400 rounded-md text-black w-40 text-center"
        />

        <button
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={handleClick}
        >
          Likes ({likes})
        </button>

        <p className="mt-4 text-lg font-bold">{result}</p>

        <div className="mt-6 w-full max-w-md">
          <Keyboard onkeyPress={handleKeyboardClick} usedLetters={usedLetters} />
        </div>
      </div>
    </div>
  );
};

export default Hackle;
