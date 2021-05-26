import React, { Component } from 'react';
import { Button } from '../Button';
import { catergories } from '../catergories'
import './PostProduct.css';

export default class PostProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productTitle: '',
      productDescription: '',
      productAuthor: '',
      productCatergory: catergories[0].name,
      productPdfFile: {},
      productJpegCoverFile: null,
      hasError: false
    }

    this.onProductTitleChange = this.onProductTitleChange.bind(this)
    this.onProductDescriptionChange = this.onProductDescriptionChange.bind(this)
    this.onProductAuthorChange = this.onProductAuthorChange.bind(this)
    this.onProductCategoryChange = this.onProductCategoryChange.bind(this)
    this.onProductPdfFileChange = this.onProductPdfFileChange.bind(this)
    this.onProductJpegCoverFileChange = this.onProductJpegCoverFileChange.bind(this)
    this.onPostProductFormSubmit = this.onPostProductFormSubmit.bind(this)

  }

  onPostProductFormSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData()

    formData.append('bookname', this.state.productTitle)
    formData.append('author', this.state.author)
    formData.append('description', this.state.productDescription)
    formData.append('category', this.state.productCatergory)
    formData.append('bookfile', this.state.productPdfFile)
    formData.append('prevfile', this.state.productJpegCoverFile)

    const details = {
      method: 'POST',
      credentials: 'include',
      header: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    }

    fetch('http://localhost:8888/api/books', details)
      .then(response => {
        console.log(response)
        if (!response.ok)
          throw new Error(response.statusText)
        window.location.href = 'http://localhost:3000'
      })
      .catch(err => {
        this.setState({
          hasError: true,
        })
        console.log(err)
      })
  }

  onProductTitleChange = (event) => {
    this.setState({
      productTitle: event.target.value,
    })
  }

  onProductDescriptionChange = (event) => {
    this.setState({
      productDescription: event.target.value,
    })
  }

  onProductAuthorChange = (event) => {
    this.setState({
      productAuthor: event.target.value,
    })
  }

  onProductCategoryChange = (event) => {
    console.log(this.state.productCatergory)
    this.setState({
      productCatergory: event.target.value
    })
  }

  onProductPdfFileChange = (event) => {
    this.setState({
      productPdfFile: event.target.files[0]
    })
  }

  onProductJpegCoverFileChange = (event) => {
    this.setState({
      productJpegCoverFile: event.target.files[0]
    })
  }

  render() {
    return (
      <div className="PostProduct test">
        <div className="post-product-container test">
          <form
            className="post-product-form"
            id="post-product-form"
            onSubmit={this.onPostProductFormSubmit}>
            <label className="post-product-form-label">Title</label>
            <input
              className="post-product-form-text-input"
              value={this.state.productTitle}
              onChange={this.onProductTitleChange}
            />
            <label className="post-product-form-label">Description</label>
            <textarea
              className="post-product-form-textarea"
              form="post-product-form"
              value={this.state.productDescription}
              onChange={this.onProductDescriptionChange}
            />
            <label className="post-product-form-label">Author</label>
            <input
              className="post-product-form-text-input"
              value={this.state.productAuthor}
              onChange={this.onProductAuthorChange}
            />
            <label className="post-product-form-label">Category</label>
            <select
              className="post-product-form-select"
              onChange={this.onProductCategoryChange}
            >
              {catergories.map(catergory => <option value={catergory.name}>{catergory.name}</option>)}
            </select>
            <label
              className="post-product-form-label"
            >PDF file</label>
            <input
              type="file"
              className="post-product-form-file"
              onChange={this.onProductPdfFileChange}
              accept=".pdf"
            ></input>
            <label className="post-product-form-label">JPEG cover file</label>
            <input
              type="file"
              accept="image/*"
              className="post-product-form-file"
              onChange={this.onProductJpegCoverFileChange}
            ></input>
            <Button className="btn-large" type="submit">Submit</Button>
          </form>
        </div>
      </div>
    )
  }
}