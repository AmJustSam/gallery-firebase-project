import {loaded} from "./loadingActions";

const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";

import {auth} from "../utils/firebase";

const login = (payload) => {
  return {
    type: SIGN_IN,
    payload: payload
  }
}

const logout = (payload) => {
  return {
    type: SIGN_OUT,
    payload: payload
  }
}

const verifyAuth = (payload) => {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login(user));
        dispatch(loaded())
      } else {
        dispatch(logout());
        dispatch(loaded());
      }
    })
  }
}

export {
  login,
  logout,
  verifyAuth
};