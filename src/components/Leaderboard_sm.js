import React, { Component } from "react";
import axios from "axios";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import "../css/custom.css";

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      highScoringUser: "",
      highScore: 0
    };
    this.saveLeaderboardScores = this.saveLeaderboardScores.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.callLeaderboardAPI = this.callLeaderboardAPI.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
    console.log(event.currentTarget.name, ":", event.currentTarget.value);
  }

  saveLeaderboardScores(response) {
    console.log("api request:", response.data[0]);
    console.log("username:", response.data[0].username);
    console.log("highscore:", response.data[0].highScore);

    const quizSet = response.data.results;

    this.setState({
      highScoringUser: response.data[0].username,
      highScore: response.data[0].highScore
    });

    //     questionsArray: quizSet
    //   },
    //   () => {
    //     this.props.addQuestionsToArray(
    //       response.data.results,
    //       this.state.difficultyOfQuestions
    //     );
    //   }
    // );

    this.props.updateLeadUserStatus(
      this.state.highScoringUser,
      this.state.highScore
    );
  }

  async callLeaderboardAPI() {
    try {
      const number = this.state.numberOfQuestions;
      const level = this.state.difficultyOfQuestions;
      const type = this.state.typeOfQuestions;

      axios.get(`http://localhost:3003/leaderboard/`).then(response => {
        console.log(response);
        this.saveLeaderboardScores(response);
      });
    } catch (error) {
      console.log("api fail", error);
    }
  }

  componentDidMount() {
    console.log(" In leaderboard QA");
    this.callLeaderboardAPI();
  }

  render() {
    return (
      <div className="textcenter textcoral">
        <p>Leaderboard </p>
        <p>
          User: {this.state.highScoringUser} {"     "}High Score:{" "}
          {this.state.highScore}%
        </p>
      </div>
    );
  }
}
export default Leaderboard;
