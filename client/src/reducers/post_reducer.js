import {
  CREATE_POST_NEW,
  UPDATE_POST_META,
  UPDATE_POST_OBJECT,
  GET_POST_VIEWABLE,
  GET_POST_PREVIEW,
  POST_ERROR
} from "../actions/types";
export default function(state = {}, actions) {
  switch (actions.type) {
    case CREATE_POST_NEW:
      return { ...state, workspace: actions.payload };
    case UPDATE_POST_META:
      return { ...state, workspace: actions.payload };
    case UPDATE_POST_OBJECT:
      return { ...state, workspace: actions.payload };
    case GET_POST_VIEWABLE:
      return { ...state, viewspace: actions.payload };
    case GET_POST_PREVIEW:
      return { ...state, viewspace: actions.payload };
    case POST_ERROR:
      return { ...state, error: actions.error };
    default:
      return state;
  }
}
