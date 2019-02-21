import { FETCH_RENTAL_BY_ID_SUCCESS, FETCH_RENTAL_BY_ID_INIT } from "../actions/types";

const INITIAL_STATE = {
  data: {}
}
export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_RENTAL_BY_ID_INIT:
      return {
        ...state, data: {}
      }
    case FETCH_RENTAL_BY_ID_SUCCESS:
    // debugger;
      // return Object.assign({}, state, { data: action.rental});
      return {
        ...state,
        data: action.rental
      }
    default:
      return state;
  }
} 