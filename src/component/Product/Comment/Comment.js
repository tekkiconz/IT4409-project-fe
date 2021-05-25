import React, { Component } from 'react'

export default class Comment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: undefined,
      userId: this.props.comment.userid,
      comment: this.props.comment.cmt
    }

    this.getUser = this.getUser.bind(this)
  }

  getUser = () => {
    console.log(this.state.userId)
    const url = new URL('http://localhost:8888/api/users/info')
    url.search = new URLSearchParams({ id: this.state.userId }).toString()

    fetch(url, {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok)
          throw new Error(response.statusText)
        return response.json()
      }).then(data =>
        this.setState({
          username: data.username
        })
      ).catch(err =>
        console.log(err)
      )
  }

  componentDidMount() {
    this.getUser()
  }

  render() {
    return (
      <div className='product-comment'>
        <strong>{this.state.username ? this.state.username : 'Loading'}</strong>: {this.state.comment}
      </div>
    )
  }
}