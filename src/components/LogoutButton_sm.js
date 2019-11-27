import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import "../css/custom.css";

class LogoutButton extends Component {
  render() {
    return (
      <div>
        <Row className="logoutgrp">
          <Col lg={8} md={8} sm={8} xs={12}>
            <h5 className="textblue">Hello {this.props.username}</h5>
          </Col>
          <Col lg={4} md={4} sm={4} xs={12}>
            <button className="logoutgrpbutton" onClick={this.props.logoutUser}>
              Logout
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}
export default LogoutButton;
