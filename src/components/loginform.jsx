import React, { Component } from "react";
import InputForm from "../common/inputform";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    }
  };
  //username = React.createRef();
  handleSubmit = e => {
    e.preventDefault();

    console.log("submitted");
  };
  handleChange = e => {
    const account = { ...this.state.account };
    account[e.target.name] = e.target.value;
    this.setState({ account });
  };
  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <InputForm
            name="username"
            value={account.username}
            onChange={this.handleChange}
          />
          <InputForm
            name="password"
            value={account.password}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
