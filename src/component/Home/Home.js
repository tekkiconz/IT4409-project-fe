import React, { Component } from 'react';

import Filter from '../Filter/Filter'
import HomeItem from './HomeItem/HomeItem'

import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      currPage: 1,
      orderBy: 'bookname',
      category: null,
    }
  }

  getBook = () => {
    const queries = {
      page: this.state.currPage,
      orderBy: this.state.orderBy,
    }

    const url = new URL('http://localhost:8888/api/books')
    url.search = new URLSearchParams(queries).toString()

    console.log(url.toString())

    fetch(url, { method: 'GET' })
      .then(response => {
        if (!response.ok)
          throw new Error(response.statusText)
        console.log(response)
        return response.json()
      }).then(data => {
        console.log(data)
        this.setState({
          products: data
        })
      }).catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getBook()
    console.log(this.state.products)
  }

  render() {
    return (
      <div className="Home test">
        <button onClick={() => console.log(this.state.products)}>Test</button>
        <div className="home-container test">
          <Filter />
          <div className="home-product">
            <div className="home-product-container test">
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
            <div className="home-page-counter test">Page</div>
          </div>

        </div>
      </div>
    )
  }
}