import React, { Component } from 'react'
import './FeaturedProduct.css';

export default class FeaturedProduct extends Component {
  product = this.props.product

  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }
  }

  getUser = () => {
    const url = new URL('http://localhost:8888/api/users/info')
    url.search = new URLSearchParams({ id: this.product.userid }).toString()

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
        alert("Somthing went wrong, reload recommended")
      )
  }

  componentDidMount() {
    this.getUser()
  }

  render() {

    return (
      <div className="FeaturedProduct" onClick={
        () => window.location.href = `http://localhost:3000/product?id=${this.product._id}`
      }>
        <div className="featured-product-container">
          <img className="featured-product-image" src={this.product.prevpath} alt={`cover for ${this.product.bookname}`}>
          </img>
          <div className="featured-product-information">
            <div className='featured-product-display-block'>
              <div className="featured-product-title">
                {this.product.bookname}
              </div>
              <div className="featured-product-rating">
                {this.product.likesCount}
                <i className="fas fa-thumbs-up featured-product-like-icon" />
              </div>
            </div>
            <div className="featured-product-description">
              Description: {this.product.description}
            </div>
            <div className="featured-product-user">
              Posted by {this.state.username}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
