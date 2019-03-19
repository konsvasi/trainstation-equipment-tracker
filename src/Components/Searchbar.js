import React, { Component } from 'react';
import '../Styles/Searchbar.css';

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: []
    }
  }

  handleChange = (ev) => {
    
  }

  render() {
    let listOfResults;
    if(this.state.result.length > 0) {
      listOfResults = this.state.result.map(station => {
        return <li key={station.name}>{station.name}</li>
      })
    }

    return (
      <div className="searchbar-container">
        <input type="text" placeholder="Search for a trainstation" onChange={this.handleChange} />
        <div className="dropdown-content">
          <ul>{listOfResults}</ul>
        </div>
      </div>
    )
  }
  
}

export default Searchbar;