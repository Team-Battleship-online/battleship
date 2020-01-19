import React, { Component } from "react";
import List from "./list.js";
import "../styles/app.css";
export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: ["Steven", "Brian", "Jack", "Kat"]
    };
  }

  render() {
    return (
      <div className="app">
        <form id="main">
          <input type="text" id="username-input" placeholder="Enter Username" />
        </form>

        <div className="player-selection">
          <div className="player-selection-top">
            <p className="player-selection-top-text">Player Selection</p>
          </div>
          <List users={this.state.users} />
        </div>
      </div>
    );
  }
}
