import * as actions from '../actions/actionTypes'
import { push } from 'react-router-redux'

const initialState = {
  isLoading: false,
  user: '',
  sessionId: '',
  token: ''
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case actions.ACTION_LOGIN_REQEST:
      dispatch(push('/')) //Tests
      return {...state,
        isLoading: true
      }
    case actions.ACTION_LOGIN_OK:
      dispatch(push('/'))
      return {...state,
        isLoading: false,
        user: action.payload.user,
        sessionId: action.payload.sessionId,
        token: action.payload.token
      }
    case actions.ACTION_LOGIN_FAILED:
      return { ...initialState }
    default:
      return state
  }
}
