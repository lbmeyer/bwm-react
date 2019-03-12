import React, { Component } from 'react';
import { MapWithGeocode } from '../../map/GoogleMap';

class RentalMap extends Component {
  
  render() { 
    // const {city, street} = this.props.location
    const location = this.props.location;
    return (
      <MapWithGeocode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDW9tFSqG2mA0ym2NluRBVGZ6tPr8xbwRM&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `358px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
      />
    );
  }
}

export default RentalMap;