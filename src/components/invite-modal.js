import React, { useState } from "react";
import "../styles/modal.css";

export default function InviteModal({
  selectedUser,
  clearModal,
  receivedGameInvite,
  sendGameInvite,
  declineGameInvite,
  userDeclined,
  toggleUserDeclined
}) {
  const [hasSent, setHasSent] = useState(false);

  const handleYes = () => {
    sendGameInvite();
    setHasSent(true);
  };

  const declined = () => {
    clearModal();
    declineGameInvite();
  };

  if (userDeclined) {
    setTimeout(() => {
      clearModal();
      toggleUserDeclined();
    }, 2000);
  }

  return (
    <div className="modal-container">
      <div className="modal">
        {!receivedGameInvite ? (
          <>
            {hasSent ? (
              <p>
                {!userDeclined ? (
                  <em>Sent Game Invite to {selectedUser}</em>
                ) : (
                  <em>{selectedUser} declined your game invitation</em>
                )}
              </p>
            ) : (
              <p> Send Game Invite to {selectedUser}</p>
            )}
            <div>
              {hasSent ? (
                ""
              ) : (
                <p onClick={handleYes} id="yes">
                  Yes
                </p>
              )}
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
              <p onClick={declined} id="no">
                No
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
