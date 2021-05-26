import React, { Component } from 'react';

import Filter from '../Filter/Filter'
import HomeItem from './HomeItem/HomeItem'

import './Home.css';
export default class Home extends Component {

  MAX_LENGTH = 15

  constructor(props) {
    super(props)
    this.state = {
      products: [],
      currLength: 0,
      currPage: 1,
      orderBy: '',
      category: '',
      searchKey: '',
    }
    this.getBook = this.getBook.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
  }

  nextPage = async () => {
    await this.setState(prev => ({
      currPage: prev.currLength === this.MAX_LENGTH ? prev.currPage + 1 : prev.currPage
    }))
    this.getBook()
  }

  prevPage = async () => {
    await this.setState(prev => ({
      currPage: prev.currPage === 1 ? 1 : prev.currPage - 1
    }))
    this.getBook()
  }

  getBook = () => {
    const queries = {
      page: this.state.currPage,
      orderBy: this.state.orderBy,
      category: this.state.category,
      searchKey: this.state.searchKey
    }

    const url = new URL('http://localhost:8888/api/books')
    url.search = new URLSearchParams(queries).toString()

    fetch(url, { method: 'GET' })
      .then(response => {
        if (!response.ok)
          throw new Error(response.statusText)
        console.log(response)
        return response.json()
      }).then(data => {
        this.setState({
          products: data,
          currLength: data.length
        })
      }).catch(err => {
        console.log(err)
      })
  }

  async componentDidMount() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const searchKey = urlParams.get('searchKey')
    const category = urlParams.get('category')
    const orderBy = urlParams.get('orderBy')

    await this.setState({
      searchKey: searchKey === null ? '' : searchKey,
      category: category === null ? '' : category,
      orderBy: orderBy === null ? '' : orderBy
    })
    this.getBook()
  }

  render() {
    return (
      <div className="Home">
        <div className="home-container">
          <Filter />
          <div className="home-product">
            {this.state.searchKey !== '' &&
              <div style={{ padding: '0.5rem' }}>Search result for {this.state.searchKey}</div>}
            <div className="home-product-container">
              {
                this.state.products[0] ? this.state.products.map(product =>
                  <HomeItem
                    key={product._id}
                    id={product._id}
                    title={product.bookname}
                    likeCount={product.likesCount}
                    imgSrc={product.prevpath} />
                ) : null
              }
            </div>
            <div className="home-page-counter">
              {this.state.currPage !== 1 && <div onClick={this.prevPage} className="home-page-change">Previous</div>}
              <div className="home-page-curr">{this.state.currPage}</div>
              {this.state.currLength === this.MAX_LENGTH && <div onClick={this.nextPage} className="home-page-change">Next</div>}
            </div>
          </div>

        </div>
      </div>
    )
  }
}