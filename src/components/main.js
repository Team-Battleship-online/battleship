import React, { Component } from "react";
import List from "./list.js";
import UsernameInput from "./username-input.js";
import Welcome from "./welcome.js";
import PlayerSelection from "./player-selection.js";
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
          username: window.localStorage.getItem("username")
        });
      }
    });
    socket.on("users", data => {
      this.setState({
        users: Object.keys(data).filter(
          user => user !== window.localStorage.getItem("username")
        )
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

          socket.emit("user-connect", {
            username: this.state.userName
          });
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
          <UsernameInput
            submitUsername={this.submitUsername}
            onChange={this.onChange}
          />
        ) : (
          <Welcome userName={this.state.userName} />
        )}

        <PlayerSelection users={this.state.users} />
      </div>
    );
  }
}
