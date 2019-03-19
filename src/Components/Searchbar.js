import React, { Component } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import '../Styles/Searchbar.css';

// Api where the search call will happen
const searchApi = searchTerm => (
  fetch(`https://api.deutschebahn.com/stada/v2/stations?searchstring=*${searchTerm}*`, {
        headers: new Headers({
          Authorization: 'Bearer 241ceeefb40850211177e76d041f442b' 
        })
      }
    )
)

// The debounced version of the searchAPI call
// this is being used to reduce the number of requests
// whenever an onchange event is triggered on the input component
const searchAPIDebounced = AwesomeDebouncePromise(searchApi, 500);

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: []
    }
  }

  handleChange = async (ev) => {
    // clear result list
    this.setState({result: []});
    const result = await searchAPIDebounced(ev.target.value);
    const data = await result.json();
    this.setState({
      result: data.result
    })
  }

  render() {
    let listOfResults;
    if(this.state.result.length > 0) {
      listOfResults = this.state.result.map(station => {
        return <li key={station.number}>{station.name}</li>
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