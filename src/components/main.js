import React, { Component } from "react";
import UsernameInput from "./username-input.js";
import Welcome from "./welcome.js";
import PlayerSelection from "./player-selection.js";
import InviteModal from "./invite-modal.js";
import io from "socket.io-client";
import "../styles/app.css";
const socket = io("http://localhost:3005");
export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      userName: "",
      selectedUser: "",
      submitted: false,
      receivedGameInvite: false
    };

    // this.submitUsername = this.submitUsername.bind(this);
    // // this.getUser = this.getUser.bind(this);
    // this.onChange = this.onChange.bind(this);
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

    socket.on("received-game-invite", username => {
      console.log("recieved game invite");
      this.setState({
        receivedGameInvite: true,
        selectedUser: username
      });
    });
  }

  submitUsername = event => {
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
  };

  getUser = selectedUser => {
    this.setState(
      {
        selectedUser
      },
      () => {
        console.log(this.state.selectedUser);
      }
    );
  };

  clearModal = () => {
    this.setState({
      selectedUser: "",
      receivedGameInvite: false
    });
  };

  sendGameInvite = () => {
    console.log("sending???");
    socket.emit("send-game-invite", this.state.selectedUser);
  };

  onChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

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
        {this.state.selectedUser ? (
          <InviteModal
            sendGameInvite={this.sendGameInvite}
            receivedGameInvite={this.state.receivedGameInvite}
            selectedUser={this.state.selectedUser}
            clearModal={this.clearModal}
          />
        ) : (
          ""
        )}
        <PlayerSelection getUser={this.getUser} users={this.state.users} />
      </div>
    );
  }
}
