import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRentalById } from '../../../actions';
import RentalDetailInfo from './RentalDetailInfo';
import { MapWithAMarker } from '../../../map/GoogleMap';

class RentalDetail extends Component {
  componentDidMount() {
    const rentalId = this.props.match.params.id;

    this.props.dispatch(fetchRentalById(rentalId));
    // debugger;
  }

  render() {
    const rental = this.props.rental;

    return (
      <>
        {rental._id ? (
          <section id="rentalDetails">
            <div className="upper-section">
              <div className="row">
                <div className="col-md-6">
                  <img src={rental.image} alt="" />
                </div>
                <div className="col-md-6">
                  <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDW9tFSqG2mA0ym2NluRBVGZ6tPr8xbwRM&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                </div>
              </div>
            </div>

            <div className="details-section">
              <div className="row">
                <div className="col-md-8">
                  <RentalDetailInfo rental={rental} />
                </div>
                <div className="col-md-4"> BOOKING</div>
              </div>
            </div>
          </section>
        ) : (
          <h1>Loading...</h1>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  rental: state.rental.data
});

export default connect(mapStateToProps)(RentalDetail);
