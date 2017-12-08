import * as actionTypes from '../actions/actionTypes'

var initialState = {
  isLoading: false,
  value: 0
}

export default function state1(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTION_1_ASYNC_START:
      console.log("Async action 1 started")
      return { ...state,
        isLoading: true
      }
    case actionTypes.ACTION_1_ASYNC_OK:
    console.log("Async action 1 succeded")
      return { ...state,
        isLoading: false,
        value: action.payload.value
      }
    case actionTypes.ACTION_1_ASYNC_FAILED:
      console.log("Async action 1 failed: ", action.payload.errorMsg)
      return { ...state,
        isLoading: false
      }
    default:
      return state
  }
}
