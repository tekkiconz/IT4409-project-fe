import React, { Component } from 'react';
import './Product.css';

export default class Body extends Component {
  render() {
    return (
      <div className="Product test">
        <div className='product-container test'>
          <div className='product-title test'>
            Title
          </div>
          <div className="product-info">
            <div className='product-preview test'>preview</div>
            <div className='product-information test'>
              <div className='product-author test'>
                - by
              </div>
              <div className='product-description test'>
                description
              </div>
            </div>
          </div>
          <div className='product-comment-container '>
            <div className='product-comment-post'>
              Add comment
            </div>
            <hr className='product-comment-divider' />
            <div className='product-comment'>
              comment
            </div>
          </div>
        </div>
      </div>)
  }
}