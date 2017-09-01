import { CREATE_POST, POST_ERROR } from "../actions/types";
export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_POST: // got back post is initialized
      return { ...state, workspace: action.payload };
    case POST_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
