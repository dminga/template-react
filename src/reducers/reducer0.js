import * as actionTypes from '../actions/actionTypes'

var initialState = {
  value: 0
}

export default function state0(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTION_0_SYNC:
      return { ...state,
        value: action.payload.value
      }
    default:
      return state
  }
}
