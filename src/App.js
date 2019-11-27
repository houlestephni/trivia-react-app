// import React from "react";
// Changed above line to below to access 'Component'
import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

// components
import UserApp from "./components/UserApp_ph";
import QuizQA from "./components/quizQA_sm";
import QuizSetup from "./components/QuizSetup_sah";
import LoginForm from "./components/Login_ph";
// import UserNavbar from "./components/UserNavbar_ph";
import Signup from "./components/NewUser_ph";
import QuizStart from "./components/QuizStart_ph";
import NewGameButton from "./components/NewGameButton_sah";
import Leaderboard from "./components/Leaderboard_sm";
import EndOfQuiz from "./components/EndOfQuiz_sah";

// dependencies
import axios from "axios";

//css and images
import "./css/normalize.css";
import "./css/skeleton.css";
import "./css/index.css";
import "./custom.scss";
import "./css/custom.css";
import logo from "./logo.svg";
import "./App.css";
import { tsExpressionWithTypeArguments } from "@babel/types";

// set baseURL
let baseURL = process.env.REACT_APP_BASEURL;
if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3003";
} else {
  baseURL = "https://fathomless-sierra-68956.herokuapp.com";
}

// changed App function to class instead
class App extends Component {
  // states

  // quizInPlay=0, isSetupDone=0, currentScore=0, questionCounter=0, numQuestions=0, difficultyLevel="", quizType="" (boolean, multiple), validUser=0, startGame=0
  constructor(props) {
    super(props);
    this.state = {
      quizInPlay: 0,
      isSetupDone: 0,
      currentScore: 0,
      questionCounter: 0,
      numQuestions: 0,
      difficultyLevel: "",
      quizType: "",
      validUser: 0,
      startGame: 0,
      gamesPlayed: 0,
      questionsArray: [],
      scorePct: 0,
      isFetching: false,
      loggedIn: false,
      username: ""
    };

    this.updateGamesPlayedCounter = this.updateGamesPlayedCounter.bind(this);
    this.addQuestionsToArray = this.addQuestionsToArray.bind(this);
    this.updateQuestionCounter = this.updateQuestionCounter.bind(this);
    this.updateDB = this.updateDB.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.updateUserStatus = this.updateUserStatus.bind(this);
  }
  // updateUserStatus
  updateUserStatus(username) {
    this.setState({ username: username, validUser: 1, loggedIn: true });
    console.log(username);
  }

  //Restart--go to Quiz Start
  startNewGame() {
    this.setState({
      quizInPlay: 0,
      isSetupDone: 0,
      startGame: 1
    });
  }

  // add and update functions
  addQuestionsToArray(response, level) {
    this.setState({
      questionsArray: response,
      isSetupDone: 1,
      quizInPlay: 1,
      numQuestions: response.length,
      difficultyLevel: level
    });
    console.log(response);
  }

  // questionCounter
  updateQuestionCounter(count) {
    this.setState({ questionCounter: count });
  }

  // games counter
  updateGamesPlayedCounter(count, score) {
    this.setState(
      {
        gamesPlayed: count,
        quizInPlay: 0,
        scorePct: Number.parseInt((100 * score) / this.state.numQuestions)
      },
      () => {
        console.log("Score pct  ", this.state.scorePct);
        this.updateDB();
      }
    );
  }

  async updateDB() {
    try {
      const username = this.state.username;
      const level = this.state.difficultyLevel;
      const score = this.state.scorePct;

      let payloadobj = {
        username: this.state.username,
        level: this.state.difficultyLevel,
        score: this.state.scorePct
      };

      console.log(payloadobj);
      axios
        .post(`http://localhost:3003/trivia/update`, payloadobj)

        .then(response => {
          console.log(response);
        });
    } catch (error) {
      console.log("api fail", error);
    }
  }

  // render
  render() {
    return (
      <div className="App">
        {/* Don't code above this */}
        {/*  */}
        {/*  */}
        {/* Header  + Login/Signup */}
        {/* <LoginForm />
        <UserNavbar />
        <Signup /> */}
        <Row>
          {/* <div className="quizrow"> */}
          {/* Header */}
          <Col lg={8} md={8} sm={8} xs={12}>
            <div className="tr_header">
              <span className="tr_header_span">TRIVIA APP HEADER</span>
            </div>
          </Col>
          <Col lg={4} md={4} sm={4} xs={12}>
            {/* Login / Signup */}
            {/* <Signup
              loggedIn={this.state.loggedIn}
              updateUserStatus={this.updateUserStatus}
            /> */}

            {/* <LoginForm updateUserStatus={this.updateUserStatus} /> */}
            <div className="tr_header">Login/Signup here </div>
            {/* {validUser===0? <LoginSignUpPrompt /> : <HelloUser> } */}
            <UserApp
              loggedIn={this.state.loggedIn}
              updateUserStatus={this.updateUserStatus}
            />
          </Col>
        </Row>
        {/*  */}
        {/*  */}

        {/* Quiz + Leaderboard */}
        <Row>
          {/* Quiz */}
          <Col lg={8} md={8} sm={8} xs={12}>
            {this.state.quizInPlay === 0 &&
              this.state.isSetupDone === 0 &&
              this.state.startGame === 0 && (
                <div>
                  <QuizStart
                    startGame={this.state.startGame}
                    startNewGame={this.startNewGame}
                  />{" "}
                </div>
              )}
            {/*  */}
            {this.state.quizInPlay === 0 &&
              this.state.isSetupDone === 0 &&
              this.state.startGame === 1 && (
                <div>
                  <QuizSetup
                    questionsArray={this.state.questionsArray}
                    addQuestionsToArray={this.addQuestionsToArray}
                  />
                </div>
              )}
            {/*  */}
            {this.state.isSetupDone === 1 && this.state.quizInPlay === 1 && (
              // this.state.questionCounter < this.state.numQuestions &&
              <div>
                <div>
                  <NewGameButton startNewGame={this.startNewGame} />
                </div>

                {/* <QuizQA
                    questionsArray={questionsArray}
                    gamesPlayed={gamesPlayed}
                    updateGamesPlayedCounter={updateGamesPlayedCounter}
                  /> */}
                <QuizQA
                  questionsArray={this.state.questionsArray}
                  updateQuestionCounter={this.updateQuestionCounter}
                  updateGamesPlayedCounter={this.updateGamesPlayedCounter}
                  gamesPlayed={this.state.gamesPlayed}
                />
              </div>
            )}
            {/*  */}
            {this.state.quizInPlay === 0 &&
              this.state.gamesPlayed > 0 &&
              this.state.isSetupDone === 1 && (
                <div>
                  <EndOfQuiz
                    scorePct={this.state.scorePct}
                    numQuestions={this.state.numQuestions}
                    startNewGame={this.startNewGame}
                  />
                </div>
              )}
            {/*  */}
          </Col>

          {/* Leaderboard */}
          <Col lg={4} md={4} sm={4} xs={12}>
            <Leaderboard />
          </Col>
        </Row>
        {/* Don't code below this */}
      </div>
    );
  }
}

export default App;
