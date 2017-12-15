import * as actions from '../actions/actionTypes'

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
  error: '',
  redirect: ''
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case actions.ACTION_LOGIN_REQEST:
      return {...state,
        isLoading: true,
        error: ''
      }
    case actions.ACTION_LOGIN_OK:
      return {...state,
        isLoading: false,
        server: action.payload.server,
        local: action.payload.local,
        error: '',
        redirect: '/'
      }
    case actions.ACTION_LOGIN_FAILED:
      return { ...initialState,
        error: action.payload.error
      }
    case actions.ACTION_LOGOUT:
      return { ...initialState }
    default:
      return state
  }
}
