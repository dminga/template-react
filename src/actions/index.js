import * as actionTypes from './actionTypes'
import { loginApi, logoutApi } from './login'

/* AUTH ACTIONS */
export const actionLogin = (user, password) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.ACTION_LOGIN_REQEST
    })
    loginApi(user, password)
    .then((retValue) => {
      dispatch({
        type: actionTypes.ACTION_LOGIN_OK,
        payload: retValue
      })
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.ACTION_LOGIN_FAILED,
        payload: {
          error: error
        }
      })
    })
  }
}

export const actionLogout = () => {
  return (dispatch, getState) => {
    var local = getState().auth.local
    logoutApi(local)
    dispatch({
      type: actionTypes.ACTION_LOGOUT
    })
  }
}
