import React from "react";
import "../styles/app.css";

export default function List({ users }) {
  return (
    <div className="players">
      {users.map(user => (
        <p>{user}</p>
      ))}
    </div>
  );
}