import * as actions from '../actions/actionTypes'

const initialState = {
  isLoading: false,
  user: '',
  sessionId: '',
  token: ''
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case actions.ACTION_LOGIN_REQEST:
      return {...state,
        isLoading: true
      }
    case actions.ACTION_LOGIN_OK:
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
