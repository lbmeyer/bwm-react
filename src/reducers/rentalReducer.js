import { FETCH_RENTALS } from '../actions/types';

const INITIAL_STATE = {
  data: []
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type)  {
    case FETCH_RENTALS:
      return {
        ...state, 
        data: action.rentals
      }
    default: 
      return state;
  }
}