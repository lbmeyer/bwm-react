import React, { Component } from 'react';
import { connect } from 'react-redux';
import RentalList from './RentalList';
import { fetchRentals } from '../../../actions';

class RentalListing extends Component {

  componentDidMount() {
    this.props.dispatch(fetchRentals());
  }
  
  render() {
    // const rentals = this.props.rentals;
    return (
      <section id="rentalListing">
        <h1 className="page-title">Your Home All Around the World</h1>
        <RentalList rentals={this.props.rentals} />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  rentals: state.rentals.data
})

export default connect(mapStateToProps)(RentalListing);
