import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Level } from "../level";
import { GameState } from "../App";
import { adjustPressedKeys, arraysAreEqual } from "../functions";

enum InGameState {
  SHOWING,
  GUESSING,
}

const GameGrid = ({
  gameState,
  setGameState,
  currentLevel,
  startingSequence,
  setFinalScore,
  setFinalLevel,
  finalLevel,
}: {
  gameState: number;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  currentLevel: Level;
  startingSequence: number[];
  setFinalScore: React.Dispatch<React.SetStateAction<number>>;
  setFinalLevel: React.Dispatch<React.SetStateAction<number>>;
  finalLevel: number;
}) => {
  const [active, setActive] = useState(null as null | number);
  const [currentSequence, setCurrentSequence] = useState(startingSequence);
  const [inGameState, setIngameState] = useState(InGameState.SHOWING);
  const [pressed, setPressed] = useState<string[]>([]);
  const [currentPress, setCurrentPress] = useState(null as null | string);

  const [successfulSequences, setSuccessfulSequences] = useState(0);
  const [speed, setSpeed] = useState(1000);

  const keyMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: number;
    if (inGameState === InGameState.SHOWING) {
      interval = setInterval(() => {
        if (currentLevel.element !== currentSequence.length) {
          setActive(currentSequence[currentLevel.updateCurrentElement()]);
        } else {
          clearInterval(interval);
          setIngameState(InGameState.GUESSING);
          setActive(null);
          keyMenuRef.current?.focus();
        }
      }, speed);
      return () => {
        clearInterval(interval);
      };
    }
  }, [active, inGameState]);

  console.log("Current Sequence: ");
  console.log(currentLevel.sequences);

  return (
    <div className="relative w-full h-full">
      <div className="absolute p-12 bottom-0 right-0 flex flex-col">
        <p className="text-white">
          Successful sequences: {successfulSequences}
        </p>
        <p className="mt-4 text-white">Level: {finalLevel}</p>
      </div>
      <div className=" flex flex-col max-w-7xl  mx-auto p-12 h-full">
        <motion.div
          tabIndex={1}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              setPressed((prev) => prev.slice(0, prev.length - 1));
            } else if (e.key === "Enter") {
              if (arraysAreEqual(currentSequence, adjustPressedKeys(pressed))) {
                console.log("Sequence is correct");
                setCurrentSequence(currentLevel.updateSequence());
                setIngameState(InGameState.SHOWING);
                setActive(null);
                setCurrentPress(null);
                setSuccessfulSequences((prev) => prev + 1);
                setPressed([]);
                setFinalScore((prev) => prev + 1);

                if ((successfulSequences + 1) % 3 === 0) {
                  currentLevel.level += 1;
                  currentLevel.levelUp();
                  setCurrentSequence(currentLevel.updateSequence());
                  setSpeed((prev) => prev - 200);
                  setFinalLevel((prev) => prev + 1);
                }
              } else {
                setIngameState(InGameState.SHOWING);
                setActive(null);
                setCurrentPress(null);
                setPressed([]);
                setCurrentSequence([]);

                setGameState(GameState.GAMEOVER);
              }
            } else {
              if (["a", "s", "d", "f"].includes(e.key)) {
                console.log(
                  "Condition:  " +
                    (pressed.length < currentSequence.length ? "True" : "False")
                );

                if (pressed.length < currentSequence.length) {
                  setPressed((prev) => [...prev, e.key.toUpperCase()]);
                  setCurrentPress(e.key.toUpperCase());
                }
              }
            }
          }}
          ref={keyMenuRef}
          initial={{ opacity: 1 }}
          animate={
            inGameState === InGameState.SHOWING
              ? { opacity: 0 }
              : { opacity: 1 }
          }
          className="w-full border justify-center flex space-x-12 border-gray-800 rounded-md h-48 p-12"
        >
          {pressed.map((key, index) => {
            return (
              <kbd
                key={index}
                className={`px-4 py-4 text-s text-white  w-12 h-12 flex justify-center items-center font-semibold ${
                  key === "A"
                    ? " bg-red-500 border-red-200"
                    : key === "S"
                    ? "bg-green-600 border-green-200"
                    : key === "D"
                    ? "bg-yellow-500 border-yellow-200"
                    : "bg-blue-500 border-blue-200"
                } border  rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500`}
              >
                {key}
              </kbd>
            );
          })}
        </motion.div>

        <div className="flex space-x-12 justify-center items-center my-auto">
          <div className="flex flex-col items-center space-y-6">
            <kbd className="px-4 py-4 text-s w-12 h-12 flex justify-center items-center font-semibold text-white bg-red-500 border border-red-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
              A
            </kbd>

            <div className="border rounded-md border-gray-700">
              <motion.div
                initial={{ opacity: 0 }}
                animate={
                  active == 1 || currentPress === "A"
                    ? { opacity: 1 }
                    : { opacity: 0 }
                }
                className="h-48 w-48 shadow-md shadow-red-500/60 bg-red-500 rounded-md"
              ></motion.div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-6">
            <kbd className="px-4 py-4 text-s w-12 h-12 flex justify-center items-center font-semibold text-white bg-green-600 border border-green-200  rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
              S
            </kbd>

            <div className="border rounded-md border-gray-700">
              <motion.div
                initial={{ opacity: 0 }}
                animate={
                  active == 2 || currentPress === "S"
                    ? { opacity: 1 }
                    : { opacity: 0 }
                }
                className="h-48 w-48 shadow-md shadow-green-500/60 bg-green-600 rounded-md"
              ></motion.div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-6">
            <kbd className="px-4 py-4 text-s w-12 h-12 flex justify-center items-center font-semibold    text-white bg-yellow-500 border border-yellow-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
              D
            </kbd>

            <div className="border rounded-md border-gray-700">
              <motion.div
                initial={{ opacity: 0 }}
                animate={
                  active == 3 || currentPress === "D"
                    ? { opacity: 1 }
                    : { opacity: 0 }
                }
                className="h-48 w-48 shadow-md shadow-yellow-500/60 bg-yellow-500 rounded-md"
              ></motion.div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-6">
            <kbd className="px-4 py-4 text-s w-12 h-12 flex justify-center items-center font-semibold  border  text-white bg-blue-500  border-blue-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
              F
            </kbd>

            <div className="border rounded-md border-gray-700">
              <motion.div
                initial={{ opacity: 0 }}
                animate={
                  active == 4 || currentPress === "F"
                    ? { opacity: 1 }
                    : { opacity: 0 }
                }
                className="h-48 w-48 shadow-md shadow-blue-500/60 bg-blue-500 rounded-md"
              ></motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameGrid;
