import React, { Component } from 'react';
import FeaturedProduct from './FeaturedProduct'

import './FeaturedProductsCarousel.css'

export default class FeaturedProductsCarousel extends Component {
  render() {
    return (
      <div className="FeaturedProductsCarousel">
        <i className='fas fa-chevron-left carousel'></i>
        <FeaturedProduct />
        <i className='fas fa-chevron-right carousel'></i>
      </div>
    )
  }
}
