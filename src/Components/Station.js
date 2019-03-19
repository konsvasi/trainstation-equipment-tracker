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

  // Makes the api call as soon as the component
  // is inserted into the dom and sets the state
  // with the data it receives
  componentDidMount() {
    const stationId = this.props.match.params.id;
    this.getStationDetails(stationId).then(data => {
      this.setState({
        name: this.props.location.state.name,
        id: stationId,
        equipment: data
      })
    })
  }

  // Checks if the new id received is different 
  // than the one it has in the state. If they are
  // different it makes an api call with the new id
  // and fills the component with the new data.
  componentDidUpdate() {
    if (this.props.match.params.id !== this.state.id) {
      this.getStationDetails(this.props.match.params.id).then(data => {
        this.setState({
          name: this.props.location.state.name,
          id: this.props.match.params.id,
          equipment: data
        })
      });
    }
  }

  // Shows the details of the station
  // if it receives an empty array as an argument
  // then the station doesn't have equipment and 
  // a message is displayed instead.
  showDetails = (equipment_array) => {
    if (equipment_array.length) {
     return equipment_array.map(eq => {
      const background_color = eq.state === 'ACTIVE' ? 'rgb(50,205,50)' : 'rgb(255, 0, 0)';
      return (
        <div key={eq.equipmentnumber.toString()} className="equipment">
          <h2>{eq.type}</h2>
          <p>{eq.description}</p>
          <p className="state" style={{backgroundColor: background_color}}>{eq.state}</p>
        </div>
      )
     }) 
    }

    return (
      <div className="equipment">
        <h2>This station doesn't have elevators or escalators</h2>
      </div>
    )
  }

  render() {
    return (
      <div className="station">
        <h1 className="station-name">{this.state.name}</h1>
        {this.showDetails(this.state.equipment)}
        <Link className="link-back" to="/">back</Link>
      </div>
    )
  }
}

export default Station;