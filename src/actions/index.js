import * as actionTypes from './actionTypes'
import { loginApi } from './login'

/* AUTH ACTIONS */
export const actionLogin = (user, password) => {
  return (dispatch, getState) => {
    console.log('dispatch request');
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
        payload: error
      })
    })
  }
}
