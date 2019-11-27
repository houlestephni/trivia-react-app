import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

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
        <h3>Test Your Trivia Knowlege!</h3>
        <Button onClick={this.props.startNewGame} variant="info" size="lg">
          Start Game
        </Button>
        {/* <Link to="/setup">Click to set up your game!</Link>
        <Route path="/setup" exact component={QuizSetup} /> */}
      </div>
    );
  }
}

export default QuizStart;
