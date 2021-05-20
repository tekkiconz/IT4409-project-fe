import React, { Component } from 'react';
import { Button } from '../Button';
import './PostProduct.css';

export default class PostProduct extends Component {
  render() {
    return (
      <div className="PostProduct test">
        <div className="post-product-container test">
          <form className="post-product-form" id="post-product-form">
            <label className="post-product-form-label">Title</label>
            <input className="post-product-form-text-input"></input>
            <label className="post-product-form-label">Description</label>
            <textarea className="post-product-form-textarea" form="post-product-form"></textarea>
            <label className="post-product-form-label">Author</label>
            <input className="post-product-form-text-input"></input>
            <label className="post-product-form-label">Category</label>
            <select className="post-product-form-select">
              <option value="hehexd">Value</option>
            </select>
            <label className="post-product-form-label">PDF file</label>
            <input type="file" className="post-product-form-file"></input>
            <label className="post-product-form-label">JPEG cover file</label>
            <input type="file" className="post-product-form-file"></input>
            <Button className="btn-large" type="submit">Submit</Button>
          </form>
        </div>
      </div>
    )
  }
}