import React, { Component } from 'react'
import './SignIn.css'

import { Button } from '../../Button';

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const details = this.state;
    const formBody = Object.keys(details)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(details[key]))
      .join('&');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      credentials: 'include',
      body: formBody
    }
    fetch("http://localhost:8888/api/users/login", options)
      .then(result => result.json())
      .then(result => console.log(result))
      .catch(err => {
        console.log(err);
      })

  }

  render() {
    return (
      <div className="SignIn">
        <h3>Sign in to your account!</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Email: </label><br />
          <input
            type="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          ></input><br />
          <label>Password: </label><br />
          <input
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          ></input><br />
          <Button type="submit"> Sign In </Button>
        </form>
      </div>
    )
  }
}