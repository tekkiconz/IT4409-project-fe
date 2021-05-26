import React, { Component } from 'react';
import { Button } from '../Button';
import Comment from './Comment/Comment';
import LikeBtn from './LikeBtn';
import './Product.css';

export default class Body extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {},
      comments: [],
      currComment: '',
      currCommentPage: 1,
      likeStatus: false
    }

    this.onCommentChange = this.onCommentChange.bind(this)
    this.getProduct = this.getProduct.bind(this)
    this.onPostComment = this.onPostComment.bind(this)
  }

  getComment = () => {
    console.log(this.state)
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const id = urlParams.get('id')
    const url = `http://localhost:8888/api/books/${id}/comments?page=${this.state.currCommentPage}`
    fetch(url, { method: 'GET' })
      .then(response => {
        if (!response.ok)
          throw new Error(response.statusText)
        return response.json()
      }).then(data => {
        if (this.state.currCommentPage === 1)
          this.setState({ comments: [...data] })
        else
          this.setState(prev => (
            { comments: [...prev.comments, ...data] }
          ))
      }
      )

  }

  getProduct = () => {
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
          product: data[0]
        })
      )
  }

  onCommentChange = (event) => {
    this.setState({
      currComment: event.target.value
    })
    console.log(this.state.currComment)
  }

  onAddPages = async (event) => {
    await this.setState(prev => ({
      currCommentPage: prev.currCommentPage + 1,
    }))
    this.getComment()
  }

  onPostLike = (event) => {
    const url = `http://localhost:8888/api/books/${this.state.product._id}/likes`
  }

  onPostComment = (event) => {
    const url = `http://localhost:8888/api/books/${this.state.product._id}/comments`
    const body = new FormData()
    body.append('cmt', this.state.currComment)
    const detail = {
      method: 'POST',
      credentials: 'include',
      body: body
    }
    fetch(url, detail)
      .then(response => {
        if (!response.ok)
          throw new Error(response.statusText)
        return response.json()
      }).then(async data => {
        console.log(data)
        await this.setState({
          currComment: '',
          currCommentPage: 1
        })
        this.getComment()
      }).catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getProduct()
    this.getComment()
  }

  render() {
    return (
      <>{
        this.state.product._id ? <div className="Product">
          <div className='product-container'>
            <div className='product-title'>
              {this.state.product.bookname}
            </div>
            <div className="product-info">
              <embed className='product-preview' src={this.state.product.bookpath}></embed>
              <div className='product-information'>
                <div className='product-author'>
                  - by {this.state.product.author ? this.state.product.author : 'NOT SUBMITTED'}
                </div>
                <div className='product-description'>
                  {this.state.product.description}
                </div>
                <LikeBtn productId={this.state.product._id} />
              </div>
            </div>
            <div className='product-comment-container '>
              <div className='product-comment-post'>
                Add comment<br />
                <textarea
                  className='product-comment-post-textarea'
                  value={this.state.currComment}
                  onChange={this.onCommentChange}
                ></textarea>
                <Button onClick={this.onPostComment}>Submit</Button>
              </div>
              <hr className='product-comment-divider' />
              {this.state.comments.map(comment =>
                <Comment key={comment._id} comment={comment} />
              )}
              <div style={{
                cursor: 'pointer',
                color: 'blue',
                textDecoration: 'underline'
              }}
                onClick={this.onAddPages}
              >View more...</div>
            </div>
          </div>
        </div> : "Loading"
      }</>)
  }
}