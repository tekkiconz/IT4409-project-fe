import React, { Component } from 'react'
import './SignUp.css'

import { Button } from '../../Button';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    });
  }


  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const details = this.state;
    const formBody = Object.keys(details)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(details[key]))
      .join('&');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }
    fetch('http://localhost:8888/api/users/signup', options)
      .then(result => result.json())
  }

  render() {
    return (
      <div className="SignUp">
        <h3>Sign up for a new account!</h3>
        <div className="sign-up-form-container">
          <form className="sign-up-form" onSubmit={this.handleSubmit}>
            <label htmlFor="username" className="sign-up-form-label" > Username: </label><br />
            <input
              name="username"
              type="text"
              className="sign-up-form-input"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            ></input>
            <br />
            <label htmlFor="email" className="sign-up-form-label"> Email: </label><br />
            <input
              name="email"
              type="email"
              className="sign-up-form-input"
              value={this.state.email}
              onChange={this.handleEmailChange}
            ></input><br />
            <label htmlFor="password" className="sign-up-form-label">Password: </label><br />
            <input
              name="password"
              type="password"
              className="sign-up-form-input"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            ></input><br />
            <Button type="submit">Sign up</Button>
          </form>
        </div>
      </div>);
  }
}