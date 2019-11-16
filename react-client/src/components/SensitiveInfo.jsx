import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";

class SensitiveInfo extends Component {
  componentDidMount() {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      this.props.handleAddErrorMessages([
        { msg: "Not logged in. Please login." }
      ]);
      this.props.history.push("/login");
      return;
    }
  }

  handleLogout = () => {
    localStorage.removeItem("jwt");
    this.props.handleAddSuccessMessage("Logged out successfully.");
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <h1>Sensitive Info</h1>
        <Button color="danger" onClick={this.handleLogout}>
          Logout
        </Button>
      </div>
    );
  }
}

export default withRouter(SensitiveInfo);
