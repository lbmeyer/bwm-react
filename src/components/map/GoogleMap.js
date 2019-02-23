import React, { Component } from 'react';
import { Cacher } from '../../services/cacher';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Circle,
  // Marker
} from 'react-google-maps';

const MapComponent = props => {
  const { coordinates, isError, isLocationLoaded } = props;
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={coordinates}
      center={coordinates}
      options={{controlSize: 22, disableDefaultUI: isError ? true : false}}
    >
      {isLocationLoaded && !isError && (
        <Circle
          center={coordinates}
          radius={500} // 500 meters
          options={{strokeColor: '#62D9FB', fillColor: '#62D9FB' }}
        />
      )}
      {isLocationLoaded && isError && (
        <InfoWindow position={coordinates} options={{maxWidth: 300}}>
          <div>
            Ooops. There is problem to find location on the map, we are trying
            to resolve problem as fast as possible. Contact host for additional
            informations if you are still interested in booking this place. We
            are sorry for incoviniance.
          </div>
        </InfoWindow>
      )}

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
        },
        isError: false,
        isLocationLoaded: false
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

            resolve(coordinates);
          } else {
            reject('Error!');
          }
        });
      });
    }

    updateCoordinates(coordinates) {
      this.setState({
        coordinates,
        isLocationLoaded: true
      })
    }

    getGeocodedLocation() {
      const location = this.props.location;
      // const location = 'asdfasdfasdf';

      // if location is cached return the cached values
      if (this.cacher.isValueCached(location)) {
        this.updateCoordinates(this.cacher.getCachedValue(location));
        // else geocode location
      } else {
        this.geocodeLocation(location).then(
          coordinates => {
            this.updateCoordinates(coordinates);
          },
          error => {
            this.setState({isLocationLoaded: true, isError: true });
          }
        );
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
