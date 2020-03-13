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
    default:
      return state
  }
}
