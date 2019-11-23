import React, { Component } from "react";

import { Container, Row, Col } from "reactstrap";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import axios from "axios";

class QuizQA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qaCounter: 0,
      qaScore: 0,
      qaShowAnswer: false,
      randomAnswers: [],
      selectedAnswer: "",
      qaIndex: 0,
      numQuestions: 5,
      qadata: [
        {
          category: "General Knowledge",
          type: "multiple",
          difficulty: "medium",
          question:
            "Rolex is a company that specializes in what type of product?",
          correct_answer: "Watches",
          incorrect_answers: ["Cars", "Computers", "Sports equipment"]
        },
        {
          category: "General Knowledge",
          type: "multiple",
          difficulty: "medium",
          question:
            "Which of the following Ivy League universities has its official motto in Hebrew as well as in Latin?",
          correct_answer: "Yale University",
          incorrect_answers: [
            "Princeton University",
            "Harvard University",
            "Columbia University",
            "Rutgers University",
            "Wisconsin University"
          ]
        },
        {
          category: "General Knowledge",
          type: "multiple",
          difficulty: "medium",
          question: "In 2013 how much money was lost by Nigerian scams?",
          correct_answer: "$12.7 Billion",
          incorrect_answers: ["$95 Million", "$956 Million", "$2.7 Billion"]
        },
        {
          category: "General Knowledge",
          type: "multiple",
          difficulty: "medium",
          question:
            "Which of these companies does NOT manufacture automobiles?",
          correct_answer: "Ducati",
          incorrect_answers: ["Nissan", "GMC", "Fiat"]
        },
        {
          category: "General Knowledge",
          type: "multiple",
          difficulty: "medium",
          question: "A factiod is what?",
          correct_answer: "A falsehood",
          incorrect_answers: [
            "Useless trivia",
            "A tiny fact",
            "A scientific figure"
          ]
        },
        {
          category: "General Knowledge",
          type: "multiple",
          difficulty: "medium",
          question:
            "Which of these is the name of a Japanese system of alternative medicine, literally meaning &quot;finger pressure&quot;?",
          correct_answer: "Shiatsu",
          incorrect_answers: ["Ukiyo", "Majime", "Ikigai"]
        }
      ]
    };
    this.dummfunc = this.dummfunc.bind(this);
    this.randomizeAnswers = this.randomizeAnswers.bind(this);
    this.handleChangeAnswerChosen = this.handleChangeAnswerChosen.bind(this);
    this._handleNextQuestion = this._handleNextQuestion.bind(this);
    this._handleChangeNextItem = this._handleChangeNextItem.bind(this);
  }

  dummfunc() {
    this.randomizeAnswers();
  }

  randomizeAnswers() {
    console.log(" in randomize answers ", this.state.qaIndex);
    const numAnswers = this.state.qadata[this.state.qaIndex].incorrect_answers
      .length;
    let newArray = [];
    let randomPosition = Number.parseInt(Math.random() * Math.ceil(numAnswers));
    let i = 0;

    for (i = 0; i < randomPosition; i++) {
      newArray[i] = this.state.qadata[this.state.qaIndex].incorrect_answers[i];
    }

    newArray[i] = this.state.qadata[this.state.qaIndex].correct_answer;

    for (let j = i; j < numAnswers; j++) {
      i++;
      newArray[i] = this.state.qadata[this.state.qaIndex].incorrect_answers[j];
    }

    this.setState({
      randomAnswers: newArray
    });
  }

  // handle button clicks
  handleChangeAnswerChosen(event) {
    this.setState(
      {
        [event.currentTarget.name]: event.currentTarget.value
      },
      function() {
        this._handleNextQuestion();
      }
    );
    console.log(event.currentTarget.name, " ", event.currentTarget.value);
    //
  }

  _handleNextQuestion() {
    console.log("selectedAnswer  ", this.state.selectedAnswer);

    this.setState(prevState => ({
      qaScore:
        prevState.qaScore +
        (this.state.selectedAnswer ===
        this.state.qadata[this.state.qaIndex].correct_answer
          ? 1
          : 0),
      qaCounter: prevState.qaCounter + 1,
      qaShowAnswer: !prevState.qaShowAnswer
    }));
  }

  _handleChangeNextItem() {
    console.log("clicked Next  ");

    this.setState(
      prevState => ({
        qaShowAnswer: !prevState.qaShowAnswer,
        qaIndex: prevState.qaIndex + 1
      }),
      () => {
        this.randomizeAnswers();
      }
    );
  }

  componentDidMount() {
    this.dummfunc();
  }
  render() {
    return (
      <div>
        <div>
          {" "}
          {"Current Score  "}
          {this.state.qaScore}
        </div>
        {"In QUIZ QA "}

        <div>
          <p> {this.state.qadata[this.state.qaIndex].question}</p>

          <ButtonGroup toggle className="mt-3">
            {this.state.randomAnswers.map((answer, index) => {
              return (
                <ToggleButton
                  type="radio"
                  name="selectedAnswer"
                  defaultChecked
                  value={this.state.randomAnswers[index]}
                  onChange={this.handleChangeAnswerChosen}
                  disabled={this.state.qaShowAnswer}
                >
                  {this.state.randomAnswers[index]}
                </ToggleButton>
              );
            })}
          </ButtonGroup>
        </div>

        {this.state.qaShowAnswer && (
          <div>
            <div> {this.state.qadata[this.state.qaIndex].correct_answer}</div>
            <Button onClick={this._handleChangeNextItem}>NEXT</Button>
          </div>
        )}
      </div>
    );
  }
}

export default QuizQA;
