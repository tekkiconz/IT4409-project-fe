import React, { Component } from 'react'
import './SearchBar.css'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchKey: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange = (event) => {
    this.setState({
      searchKey: event.target.value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    window.location.href = `http://localhost:3000?searchKey=${this.state.searchKey} `
  }

  componentDidMount() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const searchKey = urlParams.get('searchKey')

    this.setState({
      searchKey: searchKey === null ? '' : searchKey
    })
  }

  render() {
    return (
      <div className="SearchBar" >
        <form className="search-bar-form" onSubmit={this.onSubmit}>
          <input
            className="search-bar-input"
            value={this.state.searchKey}
            onChange={this.onChange}
          ></input>
          <i className="fas fa-search search-bar-icon" />
          <button type="submit" style={{
            visibility: 'hidden',
            position: 'fixed',
            left: -100000000
          }}></button>
        </form>
      </div>
    )
  }
}