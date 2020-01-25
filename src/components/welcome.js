import React from "react";

export default function Welcome({ userName }) {
  return (
    <div className="welcome">
      <p>Welcome, {userName}, to Online Multiplayer Battleship!</p>
    </div>
  );
}
