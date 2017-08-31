import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import authReducer from "./auth_reducer";
import postReducer from "./post_reducer";

export default combineReducers({
  form,
  auth: authReducer,
  post: postReducer
});
