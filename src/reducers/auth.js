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
  },
  error: ''
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case actions.ACTION_LOGIN_REQEST:
      return {...state,
        isLoading: true,
        error: ''
      }
    case actions.ACTION_LOGIN_OK:
      console.log('Login done');
      //TODO: dispatch push to '/'
      return {...state,
        isLoading: false,
        server: action.payload.server,
        local: action.payload.local,
        error: ''
      }
    case actions.ACTION_LOGIN_FAILED:
      return { ...initialState,
        error: action.payload.error
      }
    default:
      return state
  }
}
