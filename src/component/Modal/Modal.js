import React, { Component } from 'react'
import './Modal.css'
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAccount: false
    }

    this.handleAccountClick = this.handleAccountClick.bind(this)
  }

  handleAccountClick = () => {
    this.setState(prev => ({
      isAccount: !prev.isAccount,
    }))
  }

  render() {
    const { showModal, setShowModal } = this.props;

    const handleOnclick = () => {
      setShowModal(prev => !prev);
    }

    return (
      <>
        {showModal ?
          <div className='modal-background' >
            <div className='modal-wrapper'>
              <img src='https://picsum.photos/id/1068/400/500' alt='hi :>' className='modal-img'></img>
              <div className='modal-content'>
                <i className='fas fa-times modal-exit-icon' onClick={handleOnclick}></i>
                {this.state.isAccount ? <SignIn handleOnclick={handleOnclick} /> : <SignUp handleOnclick={handleOnclick} />}
                <br />
                <div
                  className="modal-account-state"
                  onClick={this.handleAccountClick}>
                  {this.state.isAccount ?
                    "Don't have an acount? Sign up!"
                    : "Already have an account? Sign in!"}
                </div>
              </div>
            </div>
          </div> : null
        }</>
    )
  }
}