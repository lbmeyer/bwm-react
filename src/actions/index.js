import axios from 'axios';
import axiosService from '../services/axiosService';

import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS
} from "../actions/types";

const axiosInstance = axiosService.getInstance();

const fetchRentalByIdInit = () => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT
  };
};

const fetchRentalByIdSuccess = rental => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental
  };
};

const fetchRentalsSuccess = rentals => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    rentals
  };
};

export const fetchRentals = () => dispatch => {
  axiosInstance.get('/rentals')
    .then(res => res.data)
    .then(rentals => dispatch(fetchRentalsSuccess(rentals)));
};

export const fetchRentalById = rentalId => dispatch => {
  dispatch(fetchRentalByIdInit());

  axios.get(`/api/v1/rentals/${rentalId}`)
    .then(res => res.data)
    .then(rental => dispatch(fetchRentalByIdSuccess(rental)))

  // simulate server call
  // setTimeout(() => {
  //   const rental = rentals.find((rental) => rental.id === rentalId);

  //   dispatch(fetchRentalByIdSuccess(rental));
  // }, 1000)
};

export const createBooking = booking => {
  return axiosInstance.post('/bookings', booking)
    .then(res => res.data)
    .catch(err => Promise.reject(err.response.data.errors))
}

// export const createBooking = (booking) => {
//   debugger;
//   return axiosInstance.post('/bookings', booking)
//       .then(res => res.data)
//       .catch(({response}) => Promise.reject(response.data.errors))
// }