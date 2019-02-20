import React, { Component } from 'react';
import { Cacher } from '../../services/cacher';
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
      height={300}
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

      this.cacher = new Cacher();
      this.state = {
        coordinates: {
          lat: 0,
          lng: 0
        }
      };
    }

    componentDidMount() {
      this.getGeocodedLocation();
    }

    geocodeLocation(location) {
      const geocoder = new window.google.maps.Geocoder();

      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: location }, (result, status) => {
          if (status === 'OK') {
            const geometry = result[0].geometry.location;
            const coordinates = { lat: geometry.lat(), lng: geometry.lng() };
            
            // cache the coordinates
            this.cacher.cacheValue(location, coordinates);

            resolve(coordinates)
          } else {
            reject('Error!');
          }
        });
      }) 
    }

    getGeocodedLocation() {
      const location = this.props.location;
      // const location = 'asdfasdfasfd';
  
      // if location is cached return the cached values
      if (this.cacher.isValueCached(location)) {
        this.setState({coordinates: this.cacher.getCachedValue(location)});
        // else geocode location
      } else {
        this.geocodeLocation(location).then(
          (coordinates) => {
            this.setState({coordinates});
          },
          (error) => {
            console.log(error);
          });
      }
    }

    render() {
      return <WrappedComponent {...this.state} />;
    }
  };
};

export const MapWithGeocode = withScriptjs(
  withGoogleMap(withGeocode(MapComponent))
);
