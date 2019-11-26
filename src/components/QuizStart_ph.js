import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
// components
import QuizSetup from "./QuizSetup_sah.js";

class QuizStart extends Component {
  constructor() {
    super();
    this.state = {};

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Test Your Trivia Knowlege!</h1>
        <button onClick={this.props.startNewGame}>Start Game</button>
        {/* <Link to="/setup">Click to set up your game!</Link>
        <Route path="/setup" exact component={QuizSetup} /> */}
      </div>
    );
  }
}

export default QuizStart;
