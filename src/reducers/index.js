import { combineReducers } from 'redux';
import rentalReducer from "./rentalReducer";
import selectRentalReducer from './selectRentalReducer';

export default combineReducers({
  rentals: rentalReducer,
  rental: selectRentalReducer
})