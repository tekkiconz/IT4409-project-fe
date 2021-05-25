import React, { Component } from 'react';
import { MenuItems } from './MenuItems'
import { Button } from '../Button'
import { Link } from '../../Route/Route'
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      isSignedIn: false,
      username: '',
      email: ''
    };
    this.handleClick = this.handleClick.bind(this)
    this.getCurrentUser = this.getCurrentUser.bind(this)
    this.handleSignout = this.handleSignout.bind(this)
  }

  handleSignout = () => {
    fetch('http://localhost:8888/api/users/signout', {
      method: 'GET',
      credentials: 'include'
    }).then(response => {
      if (!response.ok)
        throw new Error(response.statusText)
      return response.json()
    }).then(data => {
      this.setState({
        isSignedIn: false,
        username: '',
        email: ''
      })
      console.log(data);
    }).catch(err => {
      alert("Some thing went wrong");
    })

  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  getCurrentUser = () => {
    const options = {
      method: 'GET',
      credentials: 'include'
    }
    fetch('http://localhost:8888/api/users/currentuser', options)
      .then(result => result.json())
      .then(data => {
        if (data.username)
          this.setState({
            isSignedIn: true,
            username: data.username,
            email: data.email
          })
        console.log(this.state)
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getCurrentUser()
  }

  componentWillUnmount() {
    // clearInterval(this.timerID)
  }

  render() {
    const { setShowModal } = this.props;

    const handleOnClick = e => {
      setShowModal(prev => !prev);
    }

    return (
      <nav className="NavbarItems">
        <Link className="navbar-logo" to='/'>
          <h1 >
            PdfShare
            <i className="fas fa-book"></i>
          </h1>
        </Link>
        <div className="menu-icon" onClick={this.handleClick}>
          <i className={this.state.clicked ? 'fas fa-times' : "fas fa-bars"}></i>
        </div>
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link className={item.cName} to={item.url}>
                  {item.title}
                </Link>
              </li>);
          })}
          {this.state.isSignedIn ?
            <button
              className="nav-link-mobile"
              onClick={() => {
                this.handleClick()
                this.handleSignout()
              }}
            >Sign out</button>
            : <button
              className="nav-link-mobile"
              onClick={() => {
                this.handleClick()
                handleOnClick()
              }}>
              Sign up
              </button>
          }
        </ul>
        <Button
          onClick={this.state.isSignedIn ? this.handleSignout : handleOnClick}>
          {this.state.isSignedIn ? "Sign out" : "Sign in"}
        </Button>
      </nav>
    )
  }
}

export default NavBar;