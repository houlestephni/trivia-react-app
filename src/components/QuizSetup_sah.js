import React, { Component } from "react";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

class QuizSetup extends Component {
  constructor() {
    super();
    this.state = {
      numberQuestions: "10",
      difficultyQuestions: "easy",
      typeQuestions: "multiple",
      questionsArray: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });

    console.log(event.currentTarget.name);
  }
  async handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Create your quiz!</h1>
        <form onSubmit={this.handleSumbit}>
          <DropdownButton
            id="dropdown-item-button"
            title="Number of Questions"
            default="10"
          >
            <Dropdown.Item
              onClick={this.handleClick}
              as="button"
              name="5"
              value={this.state.numberQuestions}
            >
              5
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              name="10"
              onClick={this.handleClick}
              value={this.state.numberQuestions}
            >
              10
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              name="15"
              onClick={this.handleClick}
              value={this.state.numberQuestions}
            >
              15
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              name="20"
              onClick={this.handleClick}
              value={this.state.numberQuestions}
            >
              20
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-item-button" title="Difficulty">
            <Dropdown.Item
              as="button"
              name="easy"
              onClick={this.handleClick}
              value={this.state.difficultyQuestions}
            >
              Easy
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              name="medium"
              onClick={this.handleClick}
              value={this.state.difficultyQuestions}
            >
              Medium
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              name="hard"
              onClick={this.handleClick}
              value={this.state.difficultyQuestions}
            >
              Hard
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-item-button" title="Answer Type">
            <Dropdown.Item
              as="button"
              name="multiple"
              onClick={this.handleClick}
              value={this.state.typeQuestions}
            >
              Multiple Choice
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              name="boolean"
              onClick={this.handleClick}
              value={this.state.typeQuestions}
            >
              True/False
            </Dropdown.Item>
          </DropdownButton>
          <input type="submit" value="GO" />
        </form>
      </div>
    );
  }
}
export default QuizSetup;
