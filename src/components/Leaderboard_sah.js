import React, { Component } from "react";
import axios from "axios";

class Leaderboard extends Component {
  async getHighScores() {
    const response = await axios.get(`http://localhost:3003/trivia`);
    const highScores = response.data;

    this.setState({ holidays: holidays });
  }

  render() {
    return (
      <div>
        <h1>High Scores</h1>
        <h2>Date</h2>
        <ul>
          <li>username, level, 100%</li>
        </ul>
      </div>
    );
  }
}
export default Leaderboard;
