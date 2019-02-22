import { combineReducers } from 'redux';
import rentalReducer from "./rentalReducer";
import selectRentalReducer from './selectRentalReducer';

import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  rentals: rentalReducer,
  rental: selectRentalReducer,
  form: formReducer
})