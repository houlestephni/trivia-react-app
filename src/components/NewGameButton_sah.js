import React, { Component } from "react";

class NewGameButton extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.startNewGame}>New Game</button>
      </div>
    );
  }
}
export default NewGameButton;
