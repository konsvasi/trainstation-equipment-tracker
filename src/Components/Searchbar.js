import React, { Component } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { Link } from 'react-router-dom';
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
      result: [],
      display: 'none'
    };
    this.inputRef = React.createRef();
  }

  handleChange = async (ev) => {
    // clear result list
    this.setState({result: [], display: 'none'});
    const result = await searchAPIDebounced(ev.target.value);
    const data = await result.json();
    if (data.errMsg) {
      this.setState({result: [], display: 'none'});
    } else {
      this.setState({
        result: data.result,
        display: 'block'
      })
    }
  }

  closeDropdown = () => {
    this.setState({display: 'none'})
    this.inputRef.current.value = '';
  }

  render() {
    const {result, display } = this.state;
    let listOfResults;
    if(result.length > 0) {
      listOfResults = result.map(station => {
        const routingLocation = {
          pathname: station.number,
          state: {name: station.name}
        }
        return <li><Link to={routingLocation} className="link-to-station" key={station.number.toString()} onClick={this.closeDropdown}>{station.name}</Link></li>
      })
    } else {
      listOfResults = <li>No results found</li>
    }

    return (
      <div className="searchbar-container">
        <input type="text" placeholder="Search for a trainstation" onChange={this.handleChange} ref={this.inputRef} />
        <div className="dropdown-content" style={{display: display}}>
          <ul>{listOfResults}</ul>
        </div>
      </div>
    )
  }
  
}

export default Searchbar;