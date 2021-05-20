import React, { Component } from 'react'
import './Modal.css'

export default class Modal extends Component {
  render() {
    const { showModal, setShowModal } = this.props;

    const handleOnclick = e => {
      setShowModal(prev => !prev);
    }

    return (
      <>
        {showModal ?
          <div className='modal-background' >
            <div className='modal-wrapper'>
              <img src='https://picsum.photos/id/1068/400/500' alt='hi :>' className='modal-img'></img>
              <div className='modal-content'>
                <p className='modal-p'> Hello </p>
                <button className='modal-btn' onClick={handleOnclick}>Hi =)</button>
              </div>
            </div>
          </div> : null
        }</>
    )
  }
}