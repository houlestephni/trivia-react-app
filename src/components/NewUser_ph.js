import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confirmPassword: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
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

    //request to server to add a new username/password
    // axios
    //   .post("/user/", {
    //     username: this.state.username,
    //     password: this.state.password
    //   })
    //   .then(response => {
    //     console.log(response);
    //     if (!response.data.error) {
    //       console.log("successful signup");
    //       this.setState({
    //         //redirect to login page
    //         redirectTo: "/login"
    //       });
    //     } else {
    //       alert("username already taken");
    //       console.log(response.data.error);
    //     }
    //   })
    //   .catch(error => {
    //     console.log("signup error: ");
    //     console.log(error);
    //   });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="SignupForm">
          <h4>Sign up</h4>
          <form>
            <div className="form-group">
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
            <div className="form-group">
              <div className="col-1 col-ml-auto">
                <label className="form-label" htmlFor="password">
                  Password:{" "}
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
            <div className="form-group ">
              <div className="col-7"></div>
              <button
                className="btn btn-info col-1 col-mr-auto"
                onClick={this.handleSubmit}
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default Signup;
