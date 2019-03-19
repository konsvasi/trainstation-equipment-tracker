import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Station from './Station';
import '../Styles/Details.css';

// The Details component handles the routes 
// of the app. The default Route displays the
// Intro component which return a message to the user.
// When a station is clicked from the dropdown menu
// the Station component will be displayed.
const Details = () => {
  return (
    <Switch>
      <Route exact path='/' component={Intro} />
      <Route path='/:id' component={Station} />
    </Switch>
  )
}

const Intro = () => {
  return (
    <div className="details">
      <h1>Search for a station to find which elevators or escalators are working.</h1>
    </div>
  )
}

export default Details;