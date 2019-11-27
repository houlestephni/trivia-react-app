import React, { Component } from "react";

class EndOfQuiz extends Component {
  render() {
    return (
      <div>
        <h4>Quiz Completed!</h4>
        <h5>You've answered {this.props.numQuestions} questions.</h5>
        <h4 className="textgreen">You Scored: {this.props.scorePct}%</h4>
        <button onClick={this.props.startNewGame}>New Game</button>
        {/* <button>Add Score to Leaderboard</button> */}
      </div>
    );
  }
}
export default EndOfQuiz;
