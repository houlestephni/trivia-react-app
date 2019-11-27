import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class NewGameButton extends Component {
  render() {
    return (
      <div>
        <Button variant="outline-info" onClick={this.props.startNewGame}>
          New Game
        </Button>
      </div>
    );
  }
}
export default NewGameButton;
