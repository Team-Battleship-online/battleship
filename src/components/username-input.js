import React from "react";

export default function UsernameInput({ submitUsername, onChange }) {
  return (
    <form id="main" onSubmit={submitUsername}>
      <input
        onChange={onChange}
        name="userName"
        type="text"
        id="username-input"
        placeholder="Enter Username"
      />
    </form>
  );
}
