import axios from "axios";
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  CREATE_POST,
  INIT_NEW_EDITOR,
  GET_OLD_EDITOR,
  UPDATE_EDITOR_STATE,
  POST_ERROR
} from "./types";
const ROOT_URL = "http://localhost:8080"; //TODO: abstract root to config keys

export function signinUser({ username, password }, callback) {
  // return a function from our action creator
  return function(dispatch) {
    // submit username/password to server
    axios
      .post(`${ROOT_URL}/auth/signin`, { username, password })
      .then(response => {
        // if success indicate auth
        dispatch({ type: AUTH_USER });
        // save jwt token taht gets returned by the ajax request
        localStorage.setItem("token", response.data.token);
        // redirect to /cms
        callback(true);
      })
      .catch(() => {
        // if fail set state to unauth
        dispatch(authError("You shall not pass!"));
        // show errror
        callback(false);
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  // remove token from local storage to ensure signout
  localStorage.removeItem("token");

  return {
    type: UNAUTH_USER
  };
}

export function registerUser(
  { username, password, passphrase, email },
  callback
) {
  // return a function from our action creator
  return function(dispatch) {
    // submit username/password to server
    axios
      .post(`${ROOT_URL}/auth/register`, {
        username,
        password,
        passphrase,
        email
      })
      .then(response => {
        // if success indicate auth
        dispatch({ type: AUTH_USER });
        // save jwt token taht gets returned by the ajax request
        localStorage.setItem("token", response.data.token);

        // redirect to /cms
        callback(true);
      })
      .catch(() => {
        // if fail set state to unauth
        dispatch(authError("Unable to register you"));
        // show errror
        callback(false);
      });
  };
}

export function createPost(callback) {
  // return a function from our action creator
  return function(dispatch) {
    // submit username/password to server
    axios
      .post(`${ROOT_URL}/api/post`)
      .then(response => {
        // if success store payload(the id of the post)
        dispatch({
          type: CREATE_POST,
          payload: response.data
        });

        // redirect to /cms
        callback(response.data._id);
      })
      .catch(() => {
        // if fail set state to unauth
        dispatch(postError("Error Creating Post"));
        // show errror
        callback(false);
      });
  };
}

export function initNewEditor() {
  return function(dispatch) {
    dispatch({ type: INIT_NEW_EDITOR });
  };
}

export function getOldEditor(id) {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/post/${id}`)
      .then(response => {
        dispatch({
          type: GET_OLD_EDITOR,
          payload: response.data
        });
      })
      .catch(response => {
        console.log(response.data);
      });
  };
}

export function updateEditorState(editorState) {
  return function(dispatch) {
    dispatch({
      type: UPDATE_EDITOR_STATE,
      payload: editorState
    });
  };
}

export function saveEditorContent(id, content) {
  return function(dispatch) {
    axios
      .put(`${ROOT_URL}/api/post/${id}`, { content })
      .then(response => {
        console.log(response.data);
      })
      .catch(response => {
        console.log(response.data);
      });
  };
}

export function postError(error) {
  return {
    type: POST_ERROR,
    payload: error
  };
}
