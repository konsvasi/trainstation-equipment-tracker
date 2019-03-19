import React, { Component } from 'react';
import Searchbar from './Searchbar';
import Details from './Details';
import '../Styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Searchbar />
        <Details />
      </div>
    );
  }
}

export default App;
