import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRentalById } from '../../../actions';
import RentalDetailInfo from './RentalDetailInfo';
import RentalMap from './RentalMap';


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
                  <div className="map-container">
                    <div id="map">
                      <RentalMap location={`${rental.city}, ${rental.street}`} />
                    </div>                  
                  </div>
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
