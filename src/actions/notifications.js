import actionTypes from './actionTypes'
import { getNotifications } from '../services'
//  将单个文章标记为已读
export const markNotificationsAsReadByID = id => dispatch => {
  dispatch(startLoading())
  setTimeout(() => {
    dispatch({
      type: actionTypes.MARK_NOTIFICATIONS_ASREAD,
      payload: {
        id
      }
    })
    dispatch(endLoading())
  }, 2000)
}
//  将所有文章标记为已读
export const markAllNotificationsAsRead = () => dispatch => {
  dispatch(startLoading())
  setTimeout(() => {
    dispatch({
      type: actionTypes.MARK_ALL_NOTIFICATIONS_ASREAD
    })
    dispatch(endLoading())
  }, 2000)
}
//  获取所有通知
export const getAllNotifications = () => dispatch => {
  dispatch(startLoading())
  getNotifications().then(res => {
    console.log(res.list)

    dispatch({
      type: actionTypes.GET_ALL_NOTIFICATIONS,
      payload: {
        list: res.list
      }
    })
    dispatch(endLoading())
  })
}
//开始标记
export const startLoading = () => {
  return { type: actionTypes.START_LOADING }
}
//完成标记
export const endLoading = () => {
  return { type: actionTypes.END_LOADING }
}
