import React, { Component } from 'react'
import './SearchBar.css'

export default class SearchBar extends Component {
  render() {
    return (
      <div className="SearchBar">
        <input className="search-bar-input"></input>
        <i className="fas fa-search search-bar-icon"></i>
      </div>
    )
  }
}