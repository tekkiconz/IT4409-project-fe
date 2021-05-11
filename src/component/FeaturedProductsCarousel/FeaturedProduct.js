import React, { Component } from 'react'
import './FeaturedProduct.css';

export default class FeaturedProduct extends Component {
  render() {
    return (
      <div className="FeaturedProduct">
        <div className="featured-product-container">
          <div className="featured-product-image test">
          </div>
          <div className="featured-product-information test">
            <div className='featured-product-display-block '>
              <div className="featured-product-title test">
                Title
              </div>
              <div className="featured-product-rating test">rating</div>
            </div>
            <div className="featured-product-description test">
              description
            </div>
            <div className="featured-product-user test">
              postedBy
            </div>
          </div>
        </div>
      </div>
    )
  }
}
