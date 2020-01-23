import React from "react";
import "../styles/modal.css";

export default function InviteModal({ selectedUser, clearSelectedUser }) {
  return (
    <div className="modal-container">
      <div className="modal">
        <p> Send Game Invite to {selectedUser}</p>
        <div>
          <p id="yes">Yes</p>
          <p onClick={clearSelectedUser} id="no">
            No
          </p>
        </div>
      </div>
    </div>
  );
}
