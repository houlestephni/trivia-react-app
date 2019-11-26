import React, { Component } from "react";
import axios from "axios";

class NewHighScore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const response = await axios.post(`http://localhost:3003/trivia`, {
      name: this.state.name
    });
    this.setState({ name: "" });
    this.props.handleAddHoliday(response.data);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            id="username"
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <input
            type="text"
            id="score"
            name="score"
            onChange={this.handleChange}
            value={this.state.username}
          ></input>
          <input type="submit" value="Submit Score" />
        </form>
      </div>
    );
  }
}
export default NewHighScore;
