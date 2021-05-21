import React, { Component } from 'react'
import './HomeItem.css'

export default class HomeItem extends Component {
  render() {
    return (
      <div className="HomeItem test">
        <div className="home-item test">
          <div className="home-item-image test"></div>
          <div className="home-item-title test">Title</div>
          <div className="home-item-like test">like</div>
        </div>
      </div>
    )
  }
}