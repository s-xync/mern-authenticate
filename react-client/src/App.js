import React, { Component } from "react";

class App extends Component {
  render() {
    console.log(process.env.REACT_APP_SERVER_URL);
    return <h1>Simple App.</h1>;
  }
}

export default App;
