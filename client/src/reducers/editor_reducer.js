import {
  INIT_EDITOR_STATE,
  GET_EDITOR_STATE,
  UPDATE_EDITOR_STATE,
  SAVE_EDITOR_STATE
} from "../actions/types";
import { EditorState, convertFromRaw } from "draft-js";

export default function(state = {}, action) {
  switch (action.type) {
    case INIT_EDITOR_STATE: // got back user is authorized
      return { ...state, editorState: EditorState.createEmpty() };
    case GET_EDITOR_STATE:
      return {
        ...state,
        editorState: EditorState.createWithContent(
          convertFromRaw(action.payload)
        )
      };
    case UPDATE_EDITOR_STATE:
      return {
        ...state,
        editorState: action.payload
      };
    case SAVE_EDITOR_STATE:
      return { ...state, saved: true };
    default:
      return state;
  }
}
