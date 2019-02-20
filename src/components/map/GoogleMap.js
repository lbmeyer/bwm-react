import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
  Marker
} from 'react-google-maps';

const MapComponent = ({ coordinates }) => {
  return (
    <GoogleMap 
      defaultZoom={13} 
      defaultCenter={coordinates} 
      center={coordinates}
    >
      <Circle 
        center={coordinates} 
        radius={500} /> {/* 500 meters  */}
        
      {/* <Marker position={coordinates} /> */}
    </GoogleMap>
  );
};

const withGeocode = WrappedComponent => {
  return class extends Component {
    constructor() {
      super();

      this.state = {
        coordinates: {
          lat: 0,
          lng: 0
        }
      };
    }

    componentDidMount() {
      this.geocodeLocation();
    }

    geocodeLocation() {
      const location = this.props.location;
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: location }, (result, status) => {
        if (status === 'OK') {
          const geometry = result[0].geometry.location;
          const coordinates = { lat: geometry.lat(), lng: geometry.lng() };

          this.setState({
            coordinates
          });
        }
      });
    }

    render() {
      return <WrappedComponent {...this.state} />;
    }
  };
};

export const MapWithGeocode = withScriptjs(
  withGoogleMap(withGeocode(MapComponent))
);
