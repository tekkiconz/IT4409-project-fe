import React, { Component } from 'react';
import FeaturedProduct from './FeaturedProduct'

import './FeaturedProductsCarousel.css'

export default class FeaturedProductsCarousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      length: 0,
      products: [],
      currentIndex: 0,
    }

    this.nextProduct = this.nextProduct.bind(this)
    this.prevProduct = this.prevProduct.bind(this)
  }

  getFeaturedProduct = () => {
    const url = "http://localhost:8888/api/books/featuredbooks"
    fetch(url)
      .then(response => {
        if (!response.ok)
          throw new Error(response.statusText)
        return response.json()
      }).then(data => {
        this.setState({
          length: data.length,
          products: data
        })
      }).catch(err => console.log(err))
  }

  nextProduct = () => {
    this.setState(prev => ({
      currentIndex: prev.currentIndex === prev.length - 1 ? 0 : prev.currentIndex + 1,
    }))
  }

  prevProduct = () => {
    this.setState(prev => ({
      currentIndex: prev.currentIndex === 0 ? prev.length - 1 : prev.currentIndex - 1,
    }))
  }

  componentDidMount() {
    this.getFeaturedProduct()
    this.timerID = setInterval(
      () => this.nextProduct(),
      10000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  render() {
    if (!this.state.products[0])
      return null

    return (
      <div className="FeaturedProductsCarousel">
        <i className='fas fa-chevron-left carousel-left' onClick={this.prevProduct}></i>
        {this.state.products.map((product, index) => {
          return (
            <div className={index === this.state.currentIndex ? 'slide active' : 'slide'} key={product._id} >
              {index === this.state.currentIndex && <FeaturedProduct product={product} />}
            </div>
          )
        })}
        <i className='fas fa-chevron-right carousel-right' onClick={this.nextProduct}></i>
      </div>
    )
  }
}
