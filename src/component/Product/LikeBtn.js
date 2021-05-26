import React, { Component } from 'react'
import { Button } from '../Button'
import './Product.css'

export default class LikeBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likeStatus: false,
      likesCount: 0
    }
    this.onPostLike = this.onPostLike.bind(this)
  }

  getLike = () => {
    const url = `http://localhost:8888/api/books/${this.props.productId}/likes`
    const details = {
      method: 'GET',
      credentials: 'include'
    }
    fetch(url, details)
      .then(response => {
        if (!response.ok)
          throw new Error(response.statusText)
        return response.json()
      }).then(data =>
        this.setState({
          likeStatus: data.status
        })
      ).catch(err =>
        console.log(err)
      )
  }

  onPostLike = () => {
    const url = `http://localhost:8888/api/books/${this.props.productId}/likes`
    const details = {
      method: 'POST',
      credentials: 'include'
    }

    fetch(url, details)
      .then(response => {
        if (!response.ok)
          throw new Error(response.statusText)
        return response.json()
      }).then(data => {
        console.log(data)
        this.getLike()
        this.getProductLikeCounts()
      }
      ).catch(err =>
        alert("Sign in first!")
      )
  }

  getProductLikeCounts = () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const id = urlParams.get('id')

    const url = new URL('http://localhost:8888/api/books')
    url.search = new URLSearchParams({ bookid: id }).toString()

    fetch(url, { method: 'GET' })
      .then(response => {
        if (!response.ok)
          throw new Error(response.statusText)
        return response.json()
      }).then(data =>
        this.setState({
          likesCount: data[0].likesCount
        })
      ).catch(err => {
        alert('Something went wrong. Wait and reload later')
      })
    console.log(this.state.likesCount)
  }

  componentDidMount() {
    this.getLike()
    this.getProductLikeCounts()
  }

  render() {
    return (
      <Button
        className='product-like-btn'
        buttonStyle={this.state.likeStatus ? 'btn-outline' : 'btn-primary'}
        onClick={this.onPostLike}
      >
        <i className="fas fa-thumbs-up product-like-btn-icon" />
        {this.state.likesCount}
      </Button>
    )
  }
}