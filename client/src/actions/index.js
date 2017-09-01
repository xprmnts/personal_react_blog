import axios from "axios";
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  //GET_LIST,
  //LIST_ERROR,
  INIT_EDITOR_STATE,
  GET_EDITOR_STATE,
  UPDATE_EDITOR_STATE,
  SAVE_EDITOR_STATE,
  EDITOR_ERROR,
  CREATE_POST_NEW
  //UPDATE_POST_META,
  //UPDATE_POST_OBJECT,
  //POST_ACTION_ERROR,
  //GET_POST_VIEWABLE,
  //GET_POST_PREVIEW
} from "./types";
const ROOT_URL = "http://localhost:8080"; //TODO: abstract root to config keys

/******************************************************************************
** --------------------- AUTHENTICATION ACTIONS -------------------------------
******************************************************************************/
//1) Register, 2) Signin, 3) Signout 4) Error

/**************************** REGISTER A USER *********************************/
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

/***************************** SIGNIN A USER *********************************/

// Signin a User and dispatch the AUTH_USER action
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

/***************************** SIGN OUT A USER *******************************/
export function signoutUser() {
  // remove token from local storage to ensure signout
  localStorage.removeItem("token");

  return {
    type: UNAUTH_USER
  };
}

/******************** ERROR DURING REGISTRATION/SIGNIN ************************/
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

/******************************************************************************
** --------------------- POST STATE ACTIONS -------------------------------
******************************************************************************/
//1) CREATE NEW POST, 2) UPDATE POST META, 3) UPDATE POST FULL 4) POST ACTION ERROR

// When an admin clicks create, trigger this a function, the end result is that
// the state will now contain a post object, the call back should contain the post id
// to route the admin to the editor for the newly created post
export function createPostNew(callback) {
  // return a function from our action creator
  return function(dispatch) {
    // submit username/password to server
    axios
      .post(`${ROOT_URL}/api/post`)
      .then(response => {
        // if success store payload(the id of the post)
        dispatch({
          type: CREATE_POST_NEW,
          payload: response.data
        });

        // redirect to /cms // maybe able to use state property.... instead of callback...
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

export function postError(error) {
  return {
    type: POST_ERROR,
    payload: error
  };
}

/******************************************************************************
** ------------------------- EDITOR STATE ACTIONS ----------------------------
******************************************************************************/
// 1) INIT NEW EDITOR , 2) GET OLD EDITOR , 3) UPDATE EDITOR STATE
// 4) SAVE EDITOR STATE 5) EDITOR STATE ERROR

// When Editor Component Renders & post state contains no raw data property
// call initNewEditor to initilize new Editor
export function initEditorState() {
  return function(dispatch) {
    dispatch({ type: INIT_EDITOR_STATE });
  };
}

// When Editor Component Renders & post state contains raw data property
// load the editor with pre-existing data
export function getEditorState(id) {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/post/${id}`)
      .then(response => {
        dispatch({
          type: GET_EDITOR_STATE,
          payload: response.data
        });
      })
      .catch(response => {
        console.log(response.data);
      });
  };
}

// Whenever there's an on change, update the editor state for rendering
// aka the rendering is handled in the global store object inside the
// editor.editorState object
export function updateEditorState(editorState) {
  return function(dispatch) {
    dispatch({
      type: UPDATE_EDITOR_STATE,
      payload: editorState
    });
  };
}

export function saveEditorState(id, content) {
  return function(dispatch) {
    axios
      .put(`${ROOT_URL}/api/post/${id}`, { content })
      .then(response => {
        dispatch({
          type: SAVE_EDITOR_STATE,
          message: "auto saved"
        });
      })
      .catch(response => {
        console.log(response.data);
      });
  };
}

export function editorError(error) {
  return {
    type: EDITOR_ERROR,
    payload: error
  };
}
