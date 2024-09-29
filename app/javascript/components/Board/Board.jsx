import React from "react";
import { Chessboard } from "react-chessboard";

const Board = ({ id, ...otherProps }) => {
  return (
    <Chessboard
      id={id}
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
      {...otherProps}
    />
  );
};

export default Board;
