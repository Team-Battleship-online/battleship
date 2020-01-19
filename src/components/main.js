import React, { Component } from "react";
import List from "./list.js";
import "../styles/app.css";
export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: ["Steven", "Brian", "Jack", "Kat"],
      userName: "",
      submitted: false
    };

    this.submitUsername = this.submitUsername.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        userName: window.localStorage.getItem("username")
      },
      () => {
        this.setState({
          submitted: this.state.userName ? true : false
        });
      }
    );
  }

  submitUsername(event) {
    console.log(this.state.userName);
    event.preventDefault();

    this.setState(
      {
        submitted: !this.state.submitted
      },
      () => {
        window.localStorage.setItem("username", this.state.userName);
      }
    );
  }

  onChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="app">
        {!this.state.submitted ? (
          <form id="main" onSubmit={this.submitUsername}>
            <input
              onChange={this.onChange}
              name="userName"
              type="text"
              id="username-input"
              placeholder="Enter Username"
            />
          </form>
        ) : (
          <div className="welcome">
            <p>
              Welcome, {this.state.userName}, to Online Multiplayer Battlefield!
            </p>
          </div>
        )}

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
