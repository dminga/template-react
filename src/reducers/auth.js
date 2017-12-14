import * as actions from '../actions/actionTypes'
import { push } from 'react-router-redux'

const initialState = {
  isLoading: false,
  server: {
    prime: null,
    pubKey: null
  },
  local: {
    user: '',
    dh: null,
    pubKey: null,
    secret: null,
    cipher: null
  }
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case actions.ACTION_LOGIN_REQEST:
      return {...state,
        isLoading: true
      }
    case actions.ACTION_LOGIN_OK:
      dispatch(push('/'))
      return {...state,
        isLoading: false,
        server: server,
        local: local
      }
    case actions.ACTION_LOGIN_FAILED:
      return { ...initialState }
    default:
      return state
  }
}
