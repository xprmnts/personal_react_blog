import {
  CREATE_POST_NEW,
  UPDATE_POST_META,
  UPDATE_POST_OBJECT,
  GET_POST_VIEWABLE,
  GET_POST_PREVIEW,
  POST_ERROR
} from "../actions/types";
export default function(state = {}, { type, postObject, error }) {
  switch (type) {
    case CREATE_POST_NEW:
      return { ...state, workspace: postObject };
    case UPDATE_POST_META:
      return { ...state, workspace: postObject };
    case UPDATE_POST_OBJECT:
      return { ...state, workspace: postObject };
    case GET_POST_VIEWABLE:
      return { ...state, viewspace: postObject };
    case GET_POST_PREVIEW:
      return { ...state, viewspace: postObject };
    case POST_ERROR:
      return { ...state, error: error };
    default:
      return state;
  }
}
