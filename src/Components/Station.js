import React, {Component } from 'react';
import '../Styles/Station.css';

class Station extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      id: '', 
      equipment: []
    }
  }

  componentDidMount() {
    this.setState({
      name: this.props.location.state.name
    })
  }

  render() {
    return (
      <div className="station">
        <h1>{this.state.name}</h1>
        <p>Equipment</p>
      </div>
    )
  }
}

export default Station;