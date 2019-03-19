import React, {Component } from 'react';
import { Link } from 'react-router-dom';
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

  //Makes an api call with the id of the clicked station
  // to get the results about the equipment
  getStationDetails = async (stationId) => {
    const response = await fetch(`https://api.deutschebahn.com/fasta/v2/facilities?stationnumber=${stationId}`, {
      headers: new Headers({
        Authorization: 'Bearer 241ceeefb40850211177e76d041f442b' 
      })
    });

    const results = await response.json();
    return results;
  }

  componentDidMount() {
    this.setState({
      name: this.props.location.state.name
    })
    const stationId = this.props.match.params.id;
    this.getStationDetails(stationId).then(data => {
      this.setState({
        equipment: data
      })
    })
  }

  render() {
    const equipment = this.state.equipment.map(eq => (
      <div key={eq.equipmentnumber.toString()}>
        <h2>{eq.type}</h2>
        <p>{eq.description}</p>
        <p>{eq.state}</p>
      </div>
    ))

    return (
      <div className="station">
        <h1>{this.state.name}</h1>
        <div className="equipment-container">
          {equipment}
          <Link to="/">back</Link>
        </div>
      </div>
    )
  }
}

export default Station;