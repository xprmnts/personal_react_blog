import axios from "axios";
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from "./types";
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

export function fetchMessage() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/auth/`, {
        headers: {
          authorization: localStorage.getItem("token")
        }
      })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  };
}
