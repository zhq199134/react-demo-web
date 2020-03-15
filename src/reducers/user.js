import actionType from '../actions/actionTypes'
const initState = {
  id: '',
  displayName: '',
  avatar: '',
  role: '',
  isLogin: false,
  isLoading: false
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionType.START_LOGIN:
      return { ...state, isLoading: true }
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload.user,
        isLogin: true,
        isLoading: false
      }
    case actionType.LOGIN_FAILED:
      return initState
    default:
      return state
  }
}
