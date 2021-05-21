import React, { Component } from 'react';
import { MenuItems } from './MenuItems'
import { Button } from '../Button'
import { Link } from '../../Route/Route'
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
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
        </ul>
        <Button onClick={handleOnClick}>Sign up</Button>
      </nav>
    )
  }
}

export default NavBar;