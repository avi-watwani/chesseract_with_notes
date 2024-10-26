import React, { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import "./AnalysisBoard.css";

const AnalysisBoard = () => {
  const [game, setGame] = useState(new Chess());
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Utility to safely update game state
  function safeGameMutate(modify: (game: Chess) => void) {
    setGame((g) => {
      const newGame = new Chess(g.fen()); // Create a new Chess instance from the current FEN
      modify(newGame);
      return newGame;
    });
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();

    // Exit if the game is over
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
      return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });
  }

  function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
    const promotion = piece[1]?.toLowerCase() ?? "q"; // Default to 'q' for queen
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: promotion,
    });

    if (move === null) return false; // Illegal move

    setGame(game); // Update state with the new game instance

    // Store timeout so it can be cleared on undo/reset so computer doesn't execute move
    if (currentTimeout) clearTimeout(currentTimeout);
    const newTimeout = setTimeout(makeRandomMove, 200);
    setCurrentTimeout(newTimeout);
    return true;
  }

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (currentTimeout) clearTimeout(currentTimeout);
    };
  }, [currentTimeout]);

  return (
    <>
      <h1 className="title">The Chesseract Acadmey - Analysis Board</h1>
      <div style={{ width: "400px" }}>
        <Chessboard
          id="AnalysisBoard"
          position={game.fen()}
          onPieceDrop={onDrop}
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
          }}
          customDarkSquareStyle={{
            backgroundColor: "#8A82B7",
          }}
          customLightSquareStyle={{
            backgroundColor: "#FFFFFF",
          }}
        />

        {/* <button
        style={{}}
        onClick={() => {
          safeGameMutate((game) => {
            game.reset();
          });
          if (currentTimeout) clearTimeout(currentTimeout);
        }}
      >
        Reset
      </button>
      <button
        style={{}}
        onClick={() => {
          safeGameMutate((game) => {
            game.undo();
          });
          if (currentTimeout) clearTimeout(currentTimeout);
        }}
      >
        Undo
      </button> */}
      </div>
    </>
  );
};

export default AnalysisBoard;
