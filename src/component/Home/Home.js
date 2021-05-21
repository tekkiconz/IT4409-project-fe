import React, { Component } from 'react';

import Filter from '../Filter/Filter'
import HomeItem from './HomeItem/HomeItem'

import './Home.css';

export default class Home extends Component {
  render() {


    return (
      <div className="Home test">
        <div className="home-container test">
          <Filter />
          <div className="home-product">
            <div className="home-product-container test">
              <HomeItem />
              <HomeItem />
              <HomeItem />
              <HomeItem />
              <HomeItem />
              <HomeItem />
              <HomeItem />
              <HomeItem />
            </div>
            <div className="home-page-counter test">Page</div>
          </div>

        </div>
      </div>
    )
  }
}