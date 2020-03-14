import actionTypes from '../actions/actionTypes'
const initState = {
  isLoading: false,
  list: [
    {
      id: 1,
      title: '今日头条11',
      desc: '新冠肺炎疫情今日逐渐向好发展！',
      hasRead: false
    },
    {
      id: 2,
      title: '今日头条22',
      desc: '西安市新冠肺炎疫情今日逐渐向好发展！',
      hasRead: true
    }
  ]
}
export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return { ...state, isLoading: true }
    case actionTypes.END_LOADING:
      return { ...state, isLoading: false }
    case actionTypes.GET_ALL_NOTIFICATIONS:
      return { ...state, list: action.payload.list }
    case actionTypes.MARK_NOTIFICATIONS_ASREAD:
      const newList = state.list.map(item => {
        if (action.payload.id === item.id) {
          item.hasRead = true
        }
        return item
      })
      return { ...state, list: newList }
    case actionTypes.MARK_ALL_NOTIFICATIONS_ASREAD:
      const list = state.list.map(item => {
        item.hasRead = true
        return item
      })
      return {
        ...state,
        list
      }
    default:
      return state
  }
}
