import { useEffect, useState } from "react";
import GameGrid from "./components/GameGrid";
import "./index.css";
import { Level } from "./level";

export enum GameState {
  MENU,
  INGAME,
  INCREMENTING, // Pause
  GAMEOVER,
}

const App = () => {
  const [gameState, setGameState] = useState(GameState.INGAME);
  const [level, setLevel] = useState(1);
  const [finalScore, setFinalScore] = useState(0);
  const [finalLevel, setFinalLevel] = useState(0);

  let currentLevel = new Level(0);
  const startingSequence = currentLevel.updateSequence();

  useEffect(() => {
    console.log("Reload...");
    console.log(gameState);
  }, [gameState]);

  return (
    <div className="bg-gray-900 w-screen h-screen">
      {gameState === GameState.INGAME && (
        <GameGrid
          finalLevel={finalLevel}
          setFinalLevel={setFinalLevel}
          setFinalScore={setFinalScore}
          gameState={gameState}
          setGameState={setGameState}
          currentLevel={currentLevel}
          startingSequence={startingSequence}
        />
      )}
      {gameState === GameState.GAMEOVER && (
        <div className="w-full h-full bg-red-500 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <h1 className="text-6xl text-white font-bold">Game Over</h1>
            <div className="flex space-x-12 mt-12 mb-12">
              <h2 className="text=2xl text-white font-bold">
                Total Sequences: {finalScore}
              </h2>
              <h2 className="text=2xl text-white font-bold">
                Total Levels: {finalLevel}
              </h2>
            </div>
            <button
              type="button"
              className="mt-6 w-max  text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              onClick={() => setGameState(GameState.INGAME)}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
