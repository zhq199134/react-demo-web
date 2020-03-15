import actionType from '../actions/actionTypes'
const isLogin =
  Boolean(localStorage.getItem('authToken')) ||
  Boolean(sessionStorage.getItem('authToken'))
const userInfo =
  JSON.parse(localStorage.getItem('userInfo')) ||
  Boolean(sessionStorage.getItem('userInfo'))

const initState = {
  ...userInfo,
  isLogin,
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
      return {
        id: '',
        avatar: '',
        displayName: '',
        isLogin: false,
        isLoading: false,
        role: ''
      }
    default:
      return state
  }
}
