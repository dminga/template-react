import * as actionTypes from './actionTypes'
import * as work from './someAsyncWork'

/* ACTION 0 */
export const action0 = (value) => {
  return {
    type: actionTypes.ACTION_0_SYNC,
    payload: {
      value: value
    }
  }
}

/* ACTION 1 */
export const action1Start = (value) => {
  return {
    type: actionTypes.ACTION_1_ASYNC_START,
    payload: {
      value: value
    }
  }
}

export const action1Ok = (retValue) => {
  return {
    type: actionTypes.ACTION_1_ASYNC_OK,
    payload: {
      value: retValue,
      error: false
    }
  }
}

export const action1Failed = (error) => {
  return {
    type: actionTypes.ACTION_1_ASYNC_FAILED,
    payload: {
      error: true,
      errorMsg: error
    }
  }
}

export const action1Async = (value) => {
  return (dispatch, getState) => {
    dispatch(action1Start())
    work.asynWork0(value)
    .then((retValue) => {
      dispatch(action1Ok(retValue))
    })
    .catch((error) => {
      dispatch(action1Failed(error))
    })
  }
}
