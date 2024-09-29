import React from "react";
const QuickActionsObject = [
  {
    label: "Flip Board",
    id: "flip_board",
  },
  {
    label: "Board Editor",
    id: "board_editor",
  },
  {
    label: "Start Position",
    id: "start_position",
  },
  {
    label: "Clear Board",
    id: "clear_board",
  },
  {
    label: "Rest Board",
    id: "reset_board",
  },
];
const QuickActions = ({
  handleBoardOrientation,
  clearBoardHandler,
  startHandlert,
  resetHandler,
}) => {
  const actionHandler = (id) => {
    switch (id) {
      case "flip_board":
        handleBoardOrientation();
        break;
      case "board_editor":
        alert("board editor");
        break;
      case "clear_board":
        clearBoardHandler();
        break;
      case "start_position":
        startHandlert();
        break;
      case "reset_board":
        resetHandler();
        break;
      default:
        console.log("default");
    }
  };
  return (
    <div className="quick_actions_container">
      <h2 className="quick-actions-title">Quick Actions</h2>
      <ul>
        {QuickActionsObject.map((option) => (
          <Options key={option.id} onClick={actionHandler} {...option} />
        ))}
      </ul>
    </div>
  );
};

export default QuickActions;

const Options = ({ label, id, onClick }) => {
  return <li onClick={() => onClick(id)}>{label}</li>;
};
