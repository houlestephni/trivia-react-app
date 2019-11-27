import React, { Component } from "react";

class LogoutButton extends Component {
  render() {
    return (
      <div>
        <p>{this.props.username}</p>
        <button onClick={this.props.logoutUser}>Logout</button>
      </div>
    );
  }
}
export default LogoutButton;
