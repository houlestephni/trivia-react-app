import React, { Component } from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";
// components
import Signup from "./NewUser_ph";
import LoginForm from "./Login_ph.js";
import UserNavbar from "./UserNavbar_ph";

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedIn: false,
			username: null
		};

		this.getUser = this.getUser.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.updateUser = this.updateUser.bind(this);
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

	render() {
		return (
			<div className="App">
				{loggedIn ? (
					<div className="loggedIn">
						<UserNavbar
							updateUser={this.updateUser}
							loggedIn={this.state.loggedIn}
						/>
						{/* greet user if logged in: */}
						{this.state.loggedIn && (
							<p>Let's play some trivia, {this.state.username}!</p>
						)}
					</div>
				) : (
					<div className="notLoggedIn">
						<h4>Please log in to play the game</h4>
						<LoginForm updateUser={this.updateUser} />
					</div>
				)}
			</div>
		);
	}
}

export default App;
