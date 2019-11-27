import React, { Component } from "react";
import axios from "axios";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";

class QuizSetup extends Component {
  constructor() {
    super();
    this.state = {
      numberOfQuestions: "10",
      difficultyOfQuestions: "easy",
      typeOfQuestions: "multiple",
      questionsArray: []
    };
    this.saveQuestions = this.saveQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.callTriviaAPI = this.callTriviaAPI.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
    console.log(event.currentTarget.name, ":", event.currentTarget.value);
  }

  saveQuestions(response) {
    console.log("api request:", response.data.results);
    const quizSet = response.data.results;
    this.setState(
      {
        questionsArray: quizSet
      },
      () => {
        this.props.addQuestionsToArray(response.data.results);
      }
    );
  }

  async callTriviaAPI() {
    try {
      const number = this.state.numberOfQuestions;
      const level = this.state.difficultyOfQuestions;
      const type = this.state.typeOfQuestions;

      axios
        .get(
          `https://opentdb.com/api.php?amount=${number}&category=9&difficulty=${level}&type=${type}`
        )
        .then(response => {
          this.saveQuestions(response);
        });
    } catch (error) {
      console.log("api fail", error);
    }
  }

  render() {
    return (
      <div>
        <h3>Create Your Quiz!</h3>
        <DropdownButton
          id="dropdown-item-button"
          title="Number of Questions"
          variant="info"
          size="lg"
        >
          <Dropdown.Item
            onClick={this.handleClick}
            as="button"
            name="numberOfQuestions"
            value="5"
          >
            5
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            name="numberOfQuestions"
            onClick={this.handleClick}
            value="10"
          >
            10
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            name="numberOfQuestions"
            onClick={this.handleClick}
            value="15"
          >
            15
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            name="numberOfQuestions"
            onClick={this.handleClick}
            value="20"
          >
            20
          </Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          id="dropdown-item-button"
          title="Difficulty"
          variant="info"
          size="lg"
        >
          <Dropdown.Item
            as="button"
            name="difficultyOfQuestions"
            onClick={this.handleClick}
            value="easy"
          >
            Easy
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            name="difficultyOfQuestions"
            onClick={this.handleClick}
            value="medium"
          >
            Medium
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            name="difficultyOfQuestions"
            onClick={this.handleClick}
            value="hard"
          >
            Hard
          </Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          id="dropdown-item-button"
          title="Answer Type"
          variant="info"
          size="lg"
        >
          <Dropdown.Item
            as="button"
            name="typeOfQuestions"
            onClick={this.handleClick}
            value="multiple"
          >
            Multiple Choice
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            name="typeOfQuestions"
            onClick={this.handleClick}
            value="boolean"
          >
            True/False
          </Dropdown.Item>
        </DropdownButton>
        <Button
          className="bkcoral"
          onClick={this.callTriviaAPI}
          variant="info"
          size="lg"
        >
          GO
        </Button>
      </div>
    );
  }
}
export default QuizSetup;
