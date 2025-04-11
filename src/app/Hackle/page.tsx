// page currently in use
"use client";
import React from "react";
import words from "@/data/Words 5";
import  Keyboard  from "@/components/Keyboard";
import BinaryBackground from "@/components/BinaryBackground";

const Hackle = () => {
  const [likes, setLikes] = React.useState(0);
  const [guess, setGuess] = React.useState("");
  const [result, setResult] = React.useState("");
  const [grid, setGrid] = React.useState([""]);
  const [usedLetters, setUsedLetters] = React.useState<Record<string, string>>({});

  const targetValue = "ARRAY"; // TODO: set random val from dictionary per 24 hrs

  // UPDATED: isWordValid uses Gemini API call
  // const isWordValid = async (word: string): Promise<boolean> => {
  //   try {
  //     const res = await fetch("/api/validate-word", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ word })
  //     });

  //     const data = await res.json();
  //     return data.valid;
  //   } catch (error) {
  //     console.error("Validation error:", error);
  //     return false;
  //   }
  // };
  const isWordValid = (word: string): boolean => {
    word=targetValue;
    console.log(word);
    return words.valid.includes(guess.toLowerCase()) || words.words.includes(guess.toLowerCase());
  };

  // UPDATED: handleClick is now async for Gemini call
  const handleClick = async () => {
    if (guess.length !== 5) return;
    if (likes >= 6) return;

    const valid = await isWordValid(guess);
    if (!valid) {
      setResult("invalid input");
      return;
    }

    setLikes(likes + 1);
    setGrid((prevGrid) => [...prevGrid, guess]);
    setGuess("");
    updateUsedLetters(guess);

    if (likes === 5 && guess !== targetValue) {
      setResult("you lose hehe loser");
      return;
    }

    if (guess === targetValue) {
      setResult("YOU WIN");
      return;
    }
  };

  const updateUsedLetters = (currentGuess: string) => {
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

  const getLetterColor = (letter: string, index: number) => {
    if (targetValue[index] === letter) {
      return "bg-green-500";
    } else if (targetValue.includes(letter)) {
      return "bg-yellow-500";
    }
    return "bg-gray-500";
  };

  const handleKeyboardClick = (key: string) => {
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
    {/* Background */}
    <BinaryBackground />

    {/* Game Content in Front */}
      <div className="relative z-10">
      <h3 className="text-2xl font-semibold mb-4">Your Guesses:</h3>

      {/* UI: Grid display */}
      <ul className="space-y-2">
        {grid.map((guess, index) => (
          <li key={index} className="flex gap-2 justify-center">
            {guess.split("").map((letter, i) => (
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

      {/* Input Field */}
      <input
        value={guess}
        onChange={(e) => setGuess(e.target.value.toUpperCase())}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        placeholder="Guess here"
        type="text"
        id="guess"
        className="mt-4 p-2 border-2 border-gray-400 rounded-md text-black w-40 text-center"
      />

      {/* Submit Button */}
      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        onClick={handleClick}
      >
        Likes ({likes})
      </button>

      {/* Result */}
      <p className="mt-4 text-lg font-bold">{result}</p>

      {/* Keyboard */}
      <div className="mt-6 w-full max-w-md">
        <Keyboard onkeyPress={handleKeyboardClick} usedLetters={usedLetters} />
      </div>
    </div>
    </div>
  );
};

export default Hackle;
