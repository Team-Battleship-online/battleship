import React, { Component } from "react";
import List from "./list.js";
import io from "socket.io-client";
import "../styles/app.css";
const socket = io("http://localhost:3005");
export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
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

    socket.on("connect", () => {
      if (window.localStorage.getItem("username")) {
        socket.emit("user-connect", {
          username: window.localStorage.getItem("username"),
          socketId: socket.id
        });
      }
      socket.on("users", data => {
        this.setState({
          users: Object.keys(data).filter(
            user => user !== window.localStorage.getItem("username")
          )
        });
      });
    });
  }

  submitUsername(event) {
    let setUsername = true;
    console.log(this.state.userName);
    event.preventDefault();

    if (setUsername) {
      this.setState(
        {
          submitted: !this.state.submitted
        },
        () => {
          window.localStorage.setItem("username", this.state.userName);
        }
      );
    } else {
      window.localStorage.clear();
    }
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
              Welcome, {this.state.userName}, to Online Multiplayer Battleship!
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
