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
      numQuestions: 0,
      qadata: [],
      isFetching: true
    };
    this.setupQuiz = this.setupQuiz.bind(this);
    this.randomizeAnswers = this.randomizeAnswers.bind(this);
    this.handleChangeAnswerChosen = this.handleChangeAnswerChosen.bind(this);
    this._handleNextQuestion = this._handleNextQuestion.bind(this);
    this._handleChangeNextItem = this._handleChangeNextItem.bind(this);
    this._handleupdateDB = this._handleupdateDB.bind(this);
  }

  setupQuiz() {
    this.setState(
      {
        numQuestions: this.props.questionsArray.length,
        qadata: this.props.questionsArray,
        qaIndex: 0
      },
      () => {
        this.randomizeAnswers();
      }
    );
  }

  randomizeAnswers() {
    console.log(
      " in randomize answers ",
      this.state.qaIndex,
      this.state.qadata,
      this.state.qadata[0].question
    );
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
      randomAnswers: newArray,

      isFetching: false
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

    // updateQuestionCounter={this.updateQuestionCounter}
    // updateGamesPlayedCounter={this.updateGamesPlayedCounter}

    if (this.state.numQuestions === this.state.qaCounter) {
      console.log(" Done with questions");
      this.props.updateGamesPlayedCounter(
        this.props.gamesPlayed + 1,
        this.state.qaScore
      );
      // /UPDATE THE DATABASE HERE
      this._handleupdateDB();
    } else {
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
  }

  _handleupdateDB() {
    console.log("IN UPDATE DB");
  }

  componentDidMount() {
    console.log(" In quiz QA", this.props.questionsArray);
    this.setupQuiz();
  }

  render() {
    return (
      <div>
        {this.state.isFetching ? (
          <div> "Fetching data" </div>
        ) : (
          <div>
            <div>
              <h4>
                {"Current Score : "}
                {this.state.qaScore}
              </h4>
            </div>
            <div>
              <h4>
                {" "}
                {decodeURIComponent(
                  this.state.qadata[this.state.qaIndex].question
                )}
              </h4>

              <ButtonGroup toggle className="mt-3" size="lg">
                {this.state.randomAnswers.map((answer, index) => {
                  return (
                    <ToggleButton
                      variant="info"
                      type="radio"
                      name="selectedAnswer"
                      defaultChecked
                      value={this.state.randomAnswers[index]}
                      onChange={this.handleChangeAnswerChosen}
                      disabled={this.state.qaShowAnswer}
                    >
                      {decodeURIComponent(this.state.randomAnswers[index])}
                    </ToggleButton>
                  );
                })}
              </ButtonGroup>
            </div>
            <br></br>
            {this.state.qaShowAnswer && (
              <div>
                <div>
                  {"Correct Answer: "}
                  {decodeURIComponent(
                    this.state.qadata[this.state.qaIndex].correct_answer
                  )}
                </div>
                <br></br>
                <Button
                  variant="info"
                  size="lg"
                  onClick={this._handleChangeNextItem}
                >
                  NEXT
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default QuizQA;
