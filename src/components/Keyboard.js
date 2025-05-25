import React from "react";
// This component renders a keyboard for the word guessing game.
const Keyboard = ({ onkeyPress, usedLetters }) => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  // //  NEW FUNCTION: Determines the background color of each key
  // const getKeyColor = (letter) => {
  //   if (usedLetters[letter] === "correct") return "#6aaa64"; // Green for correct letters
  //   if (usedLetters[letter] === "misplaced") return "#c9b458"; // Yellow for misplaced letters
  //   if (usedLetters[letter] === "incorrect") return "#787c7e"; // Gray for incorrect letters
  //   return "#d3d6da"; // Default key color (light gray)
  // };

  //  UPDATED FUNCTION: Now applies the correct styles dynamically
  const getKeyStyle = (letter) => {
    if (usedLetters[letter] === "green") return "bg-green-500 text-white shadow-lg shadow-green-500/30";
    if (usedLetters[letter] === "yellow") return "bg-yellow-500 text-white shadow-lg shadow-yellow-500/30";
    if (usedLetters[letter] === "gray") return "bg-gray-500 text-white shadow-lg shadow-gray-500/30";
    return "bg-gray-600/80 text-white hover:bg-gray-500/80 transition-colors"; // Default color for unused letters
  };
  

  return (
    <div className="keyboard mt-8">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center space-x-1.5 my-1.5">
          {row.map((letter) => (
            <button
              key={letter}
              onClick={() => onkeyPress(letter)}
              className={`px-3 py-2.5 rounded-md font-medium text-sm ${getKeyStyle(letter)}`}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
      <div className="flex justify-center space-x-2 my-2">
        <button
          onClick={() => onkeyPress("ENTER")}
          className="px-4 py-2.5 bg-blue-500 text-white rounded-md font-medium text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
        >
          ENTER
        </button>
        <button
          onClick={() => onkeyPress("DELETE")}
          className="px-4 py-2.5 bg-red-500 text-white rounded-md font-medium text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30"
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
