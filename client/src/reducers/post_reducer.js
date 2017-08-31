import { INITIALIZE_POST } from "../actions/types";
export default function(state = {}, action) {
  switch (action.type) {
    case INITIALIZE_POST: // got back post is initialized
      return { ...state, intialized: true };
    default:
      return state;
  }
}
