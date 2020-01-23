import React from "react";
import "../styles/modal.css";

export default function InviteModal({
  selectedUser,
  clearModal,
  receivedGameInvite,
  sendGameInvite
}) {
  return (
    <div className="modal-container">
      <div className="modal">
        {!receivedGameInvite ? (
          <>
            <p> Send Game Invite to {selectedUser}</p>
            <div>
              <p onClick={sendGameInvite} id="yes">
                Yes
              </p>
              <p onClick={clearModal} id="no">
                No
              </p>
            </div>
          </>
        ) : (
          <>
            <p> Accept Game Invite From {selectedUser}</p>
            <div>
              <p id="yes">Yes</p>
              <p onClick={clearModal} id="no">
                No
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
