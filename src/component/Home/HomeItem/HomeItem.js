import React, { Component } from 'react'
import './HomeItem.css'

export default class HomeItem extends Component {
  render() {
    const { id, title, likeCount, imgSrc } = this.props

    return (
      <div className="HomeItem" onClick={() => window.location.href = `/product?id=${id}`}>
        <div className="home-item">
          <img className="home-item-image" alt={title + " cover"} src={imgSrc}></img>
          <div className="home-item-title">{title}</div>
          <div className="home-item-like">{likeCount}<i className="fas fa-thumbs-up home-item-icon"></i></div>
        </div>
      </div>
    )
  }
}