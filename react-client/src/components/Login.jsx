import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { FormGroup, Label, Input, Button, Form } from "reactstrap";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      this.props.handleAddSuccessMessage("Token found.");
      this.props.history.push("/");
    }
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { handleAddErrorMessages, handleAddSuccessMessage } = this.props;
    if (!email || !password) {
      handleAddErrorMessages([
        { msg: "Email and Password are required fields." }
      ]);
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/login`,
        {
          email,
          password
        }
      );
      localStorage.setItem("jwt", response.data.jwt);
      handleAddSuccessMessage(response.data.msg);
      this.props.history.push("/");
    } catch (err) {
      if (err.response) {
        handleAddErrorMessages(err.response.data.errors);
      } else {
        handleAddErrorMessages([
          { msg: "Something went wrong. Please try again." }
        ]);
      }
    }
  };

  loginForm = () => (
    <Form>
      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          placeholder="Please enter email"
          required
          value={this.state.email}
          onChange={this.handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Please enter password"
          required
          value={this.state.password}
          onChange={this.handleInputChange}
        />
      </FormGroup>
      <Button color="primary" onClick={this.handleSubmit} type="submit">
        Login
      </Button>
    </Form>
  );

  render() {
    return (
      <div>
        <h1>Login</h1>
        {this.loginForm()}
      </div>
    );
  }
}

export default withRouter(Login);
