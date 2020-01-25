import React from "react";
import "../styles/app.css";

export default function List({ users, getUser }) {
  return (
    <div className="players">
      {users.map(user => (
        <p onClick={() => getUser(user)} className="clickable">
          {user}
        </p>
      ))}
    </div>
  );
}
