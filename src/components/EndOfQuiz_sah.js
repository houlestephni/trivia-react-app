import React, { Component } from "react";

class EndOfQuiz extends Component {
  render() {
    return (
      <div>
        <h1>Quiz Completed!</h1>
        <h2>You've answered {this.props.numQuestions} questions.</h2>
        <h2>Score: {this.props.scorePct}%</h2>
        <button onClick={this.props.startNewGame}>New Game</button>
        <button>Add Score to Leaderboard</button>
      </div>
    );
  }
}
export default EndOfQuiz;
