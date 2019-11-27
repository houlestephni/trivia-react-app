import React, { Component } from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

// components
import Signup from "./NewUser_ph";
import LoginForm from "./Login_ph.js";
import UserNavbar from "./UserNavbar_ph";
// import QuizSetup from "./QuizSetup_sah";

class UserApp extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      displayLogIn: false,
      displaySignUp: false
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.displayLogIn = this.displayLogIn.bind(this);
    this.newUser = this.newUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get("/user/").then(response => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }
  async displayLogIn() {
    await this.setState({
      displayLogIn: !this.state.displayLogIn
    });
    console.log("displaylogin:", this.state.displayLogIn);
  }
  async newUser() {
    console.log("sign up");
    await this.setState({
      displaySignUp: !this.state.displaySignUp
    });
    console.log("displaysignup:", this.state.displaySignUp);
  }

  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? (
          <div className="loggedIn">
            <UserNavbar
              updateUser={this.updateUser}
              loggedIn={this.state.loggedIn}
            />
            {this.state.loggedIn && (
              <p>Let's play some trivia, {this.state.username}!</p>
            )}
          </div>
        ) : (
          <div className="notLoggedIn">
            <Button onClick={this.displayLogIn} variant="outline-info">
              Log In
            </Button>
            <Button onClick={this.newUser} variant="outline-info">
              Sign Up
            </Button>

            {this.state.displayLogIn && (
              <LoginForm updateUser={this.updateUser} />
            )}

            {this.state.displaySignUp && <Signup />}
          </div>
        )}
      </div>
    );
  }
}

export default UserApp;
