import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
// components
import QuizSetup from "./QuizSetup_sah.js";

class QuizStart extends Component {
	constructor() {
		super();
		this.state = {};

		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {}

	render() {
		return (
			<div>
				<Link to="/setup">Click to set up your game!</Link>
				<Route path="/setup" exact component={QuizSetup} />
			</div>
		);
	}
}

export default QuizStart;
