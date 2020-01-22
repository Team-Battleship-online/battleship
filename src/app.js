import React, { Component } from "react";
import "./styles/app.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Main from "./components/main.js";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/game"></Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    );
  }
}
