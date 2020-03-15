import actionType from './actionTypes'
import { loginHttp } from '../services'
const startLogin = () => {
  return { type: actionType.START_LOGIN }
}
const loginSuccess = user => {
  return { type: actionType.LOGIN_SUCCESS, payload: { user } }
}
const loginFailed = () => {
  localStorage.removeItem('authToken')
  sessionStorage.removeItem('authToken')
  localStorage.removeItem('userInfo')
  sessionStorage.removeItem('userInfo')
  return { type: actionType.LOGIN_FAILED }
}
export const logout = () => dispatch => {
  //告诉后端退出登录
  dispatch(loginFailed())
}
export const login = user => dispatch => {
  dispatch(startLogin())
  loginHttp(user).then(res => {
    if (res.data.code === 200) {
      const { authToken, ...userInfo } = res.data.data
      if (user.remember === true) {
        localStorage.setItem('authToken', authToken)
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
      } else {
        sessionStorage.setItem('authToken', authToken)
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      }
      dispatch(loginSuccess(userInfo))
    } else {
      dispatch(loginFailed())
    }
  })
}
export const changeAvatar = avatar => {
  return {
    type: actionType.CHANGE_AVATAR,
    payload: {
      avatar
    }
  }
}
