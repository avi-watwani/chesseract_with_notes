import React, { useState, useEffect, useMemo } from "react";
import { Chess, Square } from "chess.js";
import Board from "../Board/Board";
import QuickActions from "../QuickActions/QuickActions";

const AnalysisBoard = () => {
  // const engine = useMemo(() => new stockfish(), []);
  const game = useMemo(() => new Chess(), []);
  const [chessBoardPosition, setChessBoardPosition] = useState(game.fen());
  const [fenPosition, setFenPosition] = useState(game.fen());

  const [positionEvaluation, setPositionEvaluation] = useState(0);
  const [depth, setDepth] = useState(10);
  const [bestLine, setBestline] = useState("");
  const [possibleMate, setPossibleMate] = useState("");
  const [boardOrientation, setBoardOrientation] = useState("white");

  // function findBestMove() {
  //   engine.evaluatePosition(chessBoardPosition, 18);
  //   engine.onMessage(({ positionEvaluation, possibleMate, pv, depth }) => {
  //     if (depth && depth < 10) return;
  //     positionEvaluation &&
  //       setPositionEvaluation(
  //         ((game.turn() === "w" ? 1 : -1) * Number(positionEvaluation)) / 100
  //       );
  //     possibleMate && setPossibleMate(possibleMate);
  //     depth && setDepth(depth);
  //     pv && setBestline(pv);
  //   });
  // }

  function onDrop(sourceSquare, targetSquare, piece) {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q",
    });
    setPossibleMate("");
    setChessBoardPosition(game.fen());

    // illegal move
    if (move === null) return false;
    // engine.stop();
    setBestline("");
    if (game.isGameOver() || game.isDraw()) return false;
    return true;
  }

  const handleBoardOrientation = () => {
    setBoardOrientation(boardOrientation === "white" ? "black" : "white");
  };

  const clearBoardHandler = () => {
    game.clear();
    setFenPosition(game.fen());
  };

  const startHandlert = () => {
    game.reset();
    setFenPosition(game.fen());
  };

  const resetHandler = () => {
    setPossibleMate("");
    setBestline("");
    game.reset();
    setChessBoardPosition(game.fen());
  };
  useEffect(() => {
    if (!game.isGameOver() || game.isDraw()) {
      // findBestMove();
    }
  }, [chessBoardPosition]);

  const bestMove = bestLine?.split(" ")?.[0];

  return (
    <div className="main-container">
      <h1 className="title">The Chesseract Acadmey - Analysis Board</h1>
      <div className="analysisBoardContainer">
        <QuickActions
          handleBoardOrientation={handleBoardOrientation}
          clearBoardHandler={clearBoardHandler}
          startHandlert={startHandlert}
          resetHandler={resetHandler}
        />
        <div className="analysisBoard" style={{ width: "600px" }}>
          <Board
            id="AnalysisBoard"
            position={chessBoardPosition}
            onPieceDrop={onDrop}
            boardOrientation={boardOrientation}
            customArrows={
              bestMove
                ? [
                    [
                      bestMove.substring(0, 2) as Square,
                      bestMove.substring(2, 4) as Square,
                      "rgb(0, 128, 0)",
                    ],
                  ]
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AnalysisBoard;
