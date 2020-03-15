import actionType from './actionTypes'
import { loginHttp } from '../services'
const startLogin = () => {
  return { type: actionType.START_LOGIN }
}
const loginSuccess = user => {
  return { type: actionType.LOGIN_SUCCESS, payload: { user } }
}
const loginFailed = () => {
  return { type: actionType.LOGIN_FAILED }
}
export const login = user => dispatch => {
  dispatch(startLogin())
  loginHttp(user).then(res => {
    if (res.data.code === 200) {
      dispatch(loginSuccess(res.data.data))
    } else {
      dispatch(loginFailed())
    }
  })
}
