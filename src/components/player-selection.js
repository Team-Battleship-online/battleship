import React from "react";
import List from "./list.js";

export default function PlayerSelection({ users }) {
  return (
    <div className="player-selection">
      <div className="player-selection-top">
        <p className="player-selection-top-text">Player Selection</p>
      </div>
      <List users={users} />
    </div>
  );
}
