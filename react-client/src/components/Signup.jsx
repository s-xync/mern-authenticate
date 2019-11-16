import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { FormGroup, Label, Input, Button, Form } from "reactstrap";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    otp: "",
    stage: "signup"
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

  handleSignupSubmit = async event => {
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
        `${process.env.REACT_APP_SERVER_URL}/user/signup`,
        {
          email,
          password
        }
      );
      handleAddSuccessMessage(response.data.msg);
      this.setState({ stage: "verifyotp" });
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

  handleOTPSubmit = async event => {
    event.preventDefault();
    const { email, otp } = this.state;
    const { handleAddErrorMessages, handleAddSuccessMessage } = this.props;
    if (!otp) {
      handleAddErrorMessages([{ msg: "OTP is a required field." }]);
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/verifyotp`,
        {
          email,
          otp
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

  signupForm = () => (
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
      <Button color="primary" onClick={this.handleSignupSubmit} type="submit">
        Signup
      </Button>
    </Form>
  );

  otpForm = () => (
    <Form>
      <FormGroup>
        <Label>OTP</Label>
        <Input
          type="text"
          name="otp"
          placeholder="Please enter otp received on your email."
          required
          value={this.state.otp}
          onChange={this.handleInputChange}
        />
      </FormGroup>
      <Button color="primary" onClick={this.handleOTPSubmit} type="submit">
        Submit OTP
      </Button>
    </Form>
  );

  render() {
    return (
      <div>
        <h1>Signup</h1>
        {this.state.stage === "signup" && this.signupForm()}
        {this.state.stage === "verifyotp" && this.otpForm()}
      </div>
    );
  }
}

export default withRouter(Signup);
