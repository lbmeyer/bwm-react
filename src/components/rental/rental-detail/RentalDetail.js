import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRentalById } from 'actions';

class RentalDetail extends Component {

  componentWillMount() {
    const rentalId =  this.props.match.params.id;

    this.props.dispatch(fetchRentalById(rentalId));
  }

  render() {
    const rental = this.props.rental;

    return (
      <div>
      {rental.id 
        ? <div>
            <h1>{rental.title} </h1>
            <h1>{rental.city} </h1>
            <h1>{rental.description} </h1>
            <h1>{rental.category} </h1>
            <h1>${rental.dailyRate} </h1>
          </div>
        : <h1>Loading...</h1>
      }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rental: state.rental.data
})

export default connect(mapStateToProps)(RentalDetail);
