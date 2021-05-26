import React, { Component } from 'react'
import './UserHistory.css'

export default class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [],
      hasError: false
    }
  }

  getHistory = () => {
    const url = 'http://localhost:8888/api/users/history'
    fetch(url, {
      method: 'GET',
      credentials: 'include'
    }).then(response => {
      if (!response.ok)
        throw new Error(response.statusText)
      return response.json()
    }).then(data => {
      this.setState({
        history: data
      })
    }).catch(err => {
      this.setState({
        hasError: true
      })
    })
  }

  componentDidMount() {
    this.getHistory()
  }

  render() {
    return (<div className='UserHistory'>
      <div className='user-history-container'>
        <h1 className="user-history-title">History</h1>
        <ul className="user-history-list">
          {this.state.history.map(action =>
            <li className="user-history-list-item" key={action._id}>
              {action.nameact} on book with id {action.bookid} at {action.createdAt}
            </li>
          )}
        </ul>
      </div>

    </div>)
  }
}