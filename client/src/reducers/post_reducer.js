import { INITIALIZE_POST, POST_ERROR } from "../actions/types";
export default function(state = {}, action) {
  switch (action.type) {
    case INITIALIZE_POST: // got back post is initialized
      return { ...state, intialized: true };
    case POST_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
