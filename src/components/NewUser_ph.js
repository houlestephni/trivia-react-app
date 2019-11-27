import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import { Redirect } from "react-router-dom";
import axios from "axios";
import "../css/custom.css";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confirmPassword: ""
    };
    this.handleSubmit_login = this.handleSubmit_login.bind(this);
    this.handleSubmit_signup = this.handleSubmit_signup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit_signup(event) {
    // console.log("sign-up handleSubmit, username: ");
    console.log("new username created: " + this.state.username);
    event.preventDefault();

    let payloadobj = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post(`http://localhost:3003/trivia/signup`, payloadobj)
      .then(response => {
        console.log(response);
        //

        if (!response.data.error) {
          console.log("successful signup");
          this.props.updateUserStatus(this.state.username);
          // this.setState({
          //   //redirect to login page
          //   redirectTo: "/login"
          // });
        } else {
          alert("username already taken");
          console.log(response.data.error);
        }

        //
      });
  }

  handleSubmit_login(event) {
    event.preventDefault();
    // console.log("handleSubmit");

    let payloadobj = {
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post(`http://localhost:3003/trivia/login`, payloadobj)
      .then(response => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200 && response.data.success) {
          console.log("success ");
          alert("Successful login");
          this.props.updateUserStatus(this.state.username);
        } else {
          console.log(" something went wrong");
          alert("incorrect username or login. try again");
        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
        alert("something went wrong, try again");
      });
  }

  render() {
    return (
      <div>
        <Row>
          <div className="SignupForm">
            {/* <h4>Sign up</h4> */}
            <form>
              {/* <div className="form-group">
              <div className="col-1 col-ml-auto"> */}
              <Row>
                <div>
                  <div className="col-1 col-ml-auto">
                    <label className="form-label" htmlFor="username">
                      Username
                    </label>
                  </div>
                  <div className="col-3 col-mr-auto">
                    <input
                      className="form-input"
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div>
                  <div className="col-1 col-ml-auto">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>
                  <div className="col-3 col-mr-auto">
                    <input
                      className="form-input"
                      placeholder="password"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </Row>
              <Row>
                <div className="signuplogingrp ">
                  <button
                    // className="btn btn-info col-1 col-mr-auto"
                    onClick={this.handleSubmit_login}
                    type="submit"
                  >
                    Login
                  </button>

                  <button
                    // className="btn btn-info col-1 col-mr-auto"
                    onClick={this.handleSubmit_signup}
                    type="submit"
                  >
                    Sign up
                  </button>
                </div>
              </Row>
            </form>
          </div>
        </Row>
      </div>
    );
  }
}

export default Signup;
