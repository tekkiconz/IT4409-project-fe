import React, { Component } from 'react';
import './Filter.css'
import { catergories } from '../catergories'
import { Button } from '../Button';

export default class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortBy: '',
      category: ''
    }
  }

  onSortByChange = (event) => {
    this.setState({ sortBy: event.target.value })
  }

  onCategoryChange = (event) => {
    this.setState({ category: event.target.value })
  }

  onClick = () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const key = urlParams.get('searchKey')
    const searchKey = key === null ? '' : key

    window.location.href = `http://localhost:3000?searchKey=${searchKey}&sortBy=${this.state.sortBy}&category=${this.state.category}`

  }

  componentDidMount() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const sortedBy = urlParams.get('sortBy')
    const category = urlParams.get('category')
    this.setState({
      sortBy: sortedBy === null ? '' : sortedBy,
      category: category === null ? '' : category
    })
  }


  render() {
    return (
      <div className="Filter">
        <div className="filter-option">
          <div className="filter-option-label">Order By</div>
          <select value={this.state.sortBy} onChange={this.onSortByChange}>
            <option value=''>--No sorted by--</option>
            <option value='bookname'>Book Name</option>
            <option value='user'>User</option>
            <option value='category'>Category</option>
          </select>
        </div>
        <div className="filter-option">
          <div className="filter-option-label">Order By</div>
          <select value={this.state.category} onChange={this.onCategoryChange}>
            <option value=''>--No catergory--</option>
            {catergories.map(category => <option key={category.name} value={category.name}>{category.name}</option>)}
          </select>
        </div>
        <div><Button buttonStyle="btn-outline" onClick={this.onClick}>Search</Button></div>


      </div>
    )
  }
}