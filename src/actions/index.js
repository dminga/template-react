import * as actionTypes from './actionTypes'
import { loginApi } from './login'

/* AUTH ACTIONS */
export const actionLogin = (user, password) => {
  return (dispatch, getState) => {
    dispatch(()=>{return {
      type: actionTypes.ACTION_LOGIN_REQEST
    }})
    loginApi(user, password)
    .then((retValue) => {
      dispatch((retValue)=>{return {
        type: actionTypes.ACTION_LOGIN_OK,
        payload: retValue
      }})
    })
    .catch((error) => {
      dispatch((error)=>{return {
        type: actionTypes.ACTION_LOGIN_FAILED,
        payload: error
      }})
    })
  }
}

}
